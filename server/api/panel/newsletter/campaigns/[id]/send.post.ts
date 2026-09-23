import { requirePanelAuth } from '../../../../../utils/auth'
import { ensureNewsletterTables, useDb } from '../../../../../utils/db'
import { sendNewsletterMail } from '../../../../../utils/mail'
import { documentText, normalizeDocument, renderNewsletterEmail } from '../../../../../utils/newsletter'

type Delivery = {
  id: string
  email: string
  unsubscribe_token: string
}

export default defineEventHandler(async (event) => {
  await requirePanelAuth(event, true)
  await ensureNewsletterTables()
  const body = await readBody(event).catch(() => ({}))
  const retryFailed = body?.retryFailed === true
  const campaignId = Number(getRouterParam(event, 'id'))
  if (!Number.isInteger(campaignId) || campaignId < 1) throw createError({ statusCode: 400, statusMessage: 'Invalid campaign' })

  const sql = useDb()
  const [campaign] = await sql<{
    id: number
    subject: string
    preview_text: string | null
    content: object
    status: string
    failed_count: number
  }[]>`SELECT id, subject, preview_text, content, status, failed_count FROM newsletter_campaigns WHERE id = ${campaignId}`
  if (!campaign) throw createError({ statusCode: 404, statusMessage: 'Campaign not found' })
  if (!['draft', 'sending'].includes(campaign.status) && !(campaign.status === 'sent' && retryFailed && campaign.failed_count > 0)) {
    throw createError({ statusCode: 409, statusMessage: 'This campaign has already been sent' })
  }

  if (campaign.status === 'draft') {
    await sql`
      INSERT INTO newsletter_deliveries (campaign_id, subscriber_id)
      SELECT ${campaignId}, id FROM waitlist WHERE status = 'subscribed'
      ON CONFLICT (campaign_id, subscriber_id) DO NOTHING
    `
    await sql`
      UPDATE newsletter_campaigns
      SET status = 'sending', recipient_count = (SELECT COUNT(*) FROM newsletter_deliveries WHERE campaign_id = ${campaignId}), updated_at = NOW()
      WHERE id = ${campaignId} AND status = 'draft'
    `
  }

  if (campaign.status === 'sent' && retryFailed) {
    await sql`UPDATE newsletter_deliveries SET status = 'pending', error = NULL, updated_at = NOW() WHERE campaign_id = ${campaignId} AND status = 'failed'`
    await sql`UPDATE newsletter_campaigns SET status = 'sending', failed_count = 0, updated_at = NOW() WHERE id = ${campaignId}`
  }

  await sql`
    UPDATE newsletter_deliveries SET status = 'pending', updated_at = NOW()
    WHERE campaign_id = ${campaignId} AND status = 'processing' AND updated_at < NOW() - INTERVAL '10 minutes'
  `

  const claimed = await sql<{ id: string }[]>`
    WITH next AS (
      SELECT id FROM newsletter_deliveries
      WHERE campaign_id = ${campaignId} AND status = 'pending'
      ORDER BY id
      LIMIT 20
      FOR UPDATE SKIP LOCKED
    )
    UPDATE newsletter_deliveries d
    SET status = 'processing', updated_at = NOW()
    FROM next
    WHERE d.id = next.id
    RETURNING d.id
  `

  const deliveries = claimed.length
    ? await sql<Delivery[]>`
        SELECT d.id, w.email, w.unsubscribe_token
        FROM newsletter_deliveries d
        JOIN waitlist w ON w.id = d.subscriber_id
        WHERE d.id IN ${sql(claimed.map(({ id }) => id))}
      `
    : []
  const content = normalizeDocument(campaign.content)
  const config = useRuntimeConfig()
  const siteUrl = String(config.public.siteUrl).replace(/\/$/, '')

  await Promise.all(deliveries.map(async (delivery) => {
    const unsubscribeUrl = `${siteUrl}/unsubscribe?token=${encodeURIComponent(delivery.unsubscribe_token)}`
    try {
      await sendNewsletterMail({
        to: delivery.email,
        subject: campaign.subject,
        html: renderNewsletterEmail(content, campaign.preview_text || '', unsubscribeUrl),
        text: `${documentText(content)}\n\nUnsubscribe: ${unsubscribeUrl}`,
        unsubscribeUrl: `${siteUrl}/api/newsletter/unsubscribe?token=${encodeURIComponent(delivery.unsubscribe_token)}`,
      })
      await sql`UPDATE newsletter_deliveries SET status = 'sent', sent_at = NOW(), updated_at = NOW(), error = NULL WHERE id = ${delivery.id}`
    } catch (error) {
      const message = error instanceof Error ? error.message.slice(0, 500) : 'Unknown delivery error'
      await sql`UPDATE newsletter_deliveries SET status = 'failed', error = ${message}, updated_at = NOW() WHERE id = ${delivery.id}`
    }
  }))

  const [counts] = await sql<{ pending: string; sent: string; failed: string }[]>`
    SELECT
      COUNT(*) FILTER (WHERE status IN ('pending', 'processing'))::TEXT AS pending,
      COUNT(*) FILTER (WHERE status = 'sent')::TEXT AS sent,
      COUNT(*) FILTER (WHERE status = 'failed')::TEXT AS failed
    FROM newsletter_deliveries WHERE campaign_id = ${campaignId}
  `
  const pending = Number(counts!.pending)
  const sent = Number(counts!.sent)
  const failed = Number(counts!.failed)
  await sql`
    UPDATE newsletter_campaigns
    SET sent_count = ${sent}, failed_count = ${failed},
      status = ${pending === 0 ? 'sent' : 'sending'},
      sent_at = CASE WHEN ${pending} = 0 THEN NOW() ELSE sent_at END,
      updated_at = NOW()
    WHERE id = ${campaignId}
  `

  return { pending, sent, failed, processed: deliveries.length, complete: pending === 0 }
})
