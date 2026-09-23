import { requirePanelAuth } from '../../../utils/auth'
import { ensureNewsletterTables, useDb } from '../../../utils/db'

export default defineEventHandler(async (event) => {
  await requirePanelAuth(event)
  await ensureNewsletterTables()
  const sql = useDb()
  const query = getQuery(event)
  const page = Math.max(1, Number(query.page) || 1)
  const perPage = 50
  const offset = (page - 1) * perPage
  const search = typeof query.search === 'string' ? query.search.trim().slice(0, 100) : ''
  const pattern = `%${search}%`

  const [summary, subscribers, subscriberCount, campaigns, templates] = await Promise.all([
    sql<{ subscribed: string; unsubscribed: string; campaigns: string; delivered: string }[]>`
      SELECT
        (SELECT COUNT(*) FROM waitlist WHERE status = 'subscribed')::TEXT AS subscribed,
        (SELECT COUNT(*) FROM waitlist WHERE status = 'unsubscribed')::TEXT AS unsubscribed,
        (SELECT COUNT(*) FROM newsletter_campaigns)::TEXT AS campaigns,
        (SELECT COUNT(*) FROM newsletter_deliveries WHERE status = 'sent')::TEXT AS delivered
    `,
    sql<{ id: number; email: string; source: string | null; status: string; created_at: string; unsubscribed_at: string | null }[]>`
      SELECT id, email, source, status, created_at, unsubscribed_at
      FROM waitlist
      WHERE (${search} = '' OR email ILIKE ${pattern})
      ORDER BY created_at DESC
      LIMIT ${perPage} OFFSET ${offset}
    `,
    sql<{ count: string }[]>`SELECT COUNT(*)::TEXT AS count FROM waitlist WHERE (${search} = '' OR email ILIKE ${pattern})`,
    sql<{
      id: number
      name: string
      subject: string
      preview_text: string | null
      content: object
      status: string
      recipient_count: number
      sent_count: number
      failed_count: number
      created_at: string
      sent_at: string | null
    }[]>`
      SELECT id, name, subject, preview_text, content, status, recipient_count, sent_count, failed_count, created_at, sent_at
      FROM newsletter_campaigns
      ORDER BY created_at DESC
      LIMIT 50
    `,
    sql<{ id: number; name: string; subject: string; preview_text: string | null; content: object; is_system: boolean }[]>`
      SELECT id, name, subject, preview_text, content, is_system
      FROM newsletter_templates
      ORDER BY is_system DESC, name
    `,
  ])

  const totals = summary[0]!
  const total = Number(subscriberCount[0]?.count || 0)
  return {
    testRecipient: useRuntimeConfig().newsletterTestEmail,
    summary: {
      subscribed: Number(totals.subscribed),
      unsubscribed: Number(totals.unsubscribed),
      campaigns: Number(totals.campaigns),
      delivered: Number(totals.delivered),
    },
    subscribers,
    pagination: { page, perPage, total, totalPages: Math.ceil(total / perPage) },
    campaigns,
    templates,
  }
})
