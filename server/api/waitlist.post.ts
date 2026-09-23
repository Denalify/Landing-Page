import { createHash, randomUUID } from 'node:crypto'
import { useDb, ensureNewsletterTables } from '../utils/db'

const VALID_SOURCES = [
  'Search engine', 'Facebook', 'YouTube', 'Twitter/X',
  'LinkedIn', 'Reddit', 'Friend / colleague', 'Other',
]

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  if (body?.website) return { success: true }
  const email = typeof body?.email === 'string' ? body.email.trim().toLowerCase() : ''

  if (!email || email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid email address' })
  }
  if (body?.consent !== true) {
    throw createError({ statusCode: 400, statusMessage: 'Newsletter consent is required' })
  }

  const rawSource = body?.source ?? null
  const source = rawSource && VALID_SOURCES.includes(rawSource) ? rawSource : null

  const sql = useDb()
  await ensureNewsletterTables()
  await sql`DELETE FROM newsletter_signup_attempts WHERE window_started_at < NOW() - INTERVAL '2 hours'`

  const ip = getRequestIP(event, { xForwardedFor: true }) || 'unknown'
  const limitKey = createHash('sha256').update(ip).digest('hex')
  const [rate] = await sql<{ attempts: number }[]>`
    INSERT INTO newsletter_signup_attempts (key, attempts, window_started_at)
    VALUES (${limitKey}, 1, NOW())
    ON CONFLICT (key) DO UPDATE SET
      attempts = CASE WHEN newsletter_signup_attempts.window_started_at < NOW() - INTERVAL '1 hour' THEN 1 ELSE newsletter_signup_attempts.attempts + 1 END,
      window_started_at = CASE WHEN newsletter_signup_attempts.window_started_at < NOW() - INTERVAL '1 hour' THEN NOW() ELSE newsletter_signup_attempts.window_started_at END
    RETURNING attempts
  `
  if ((rate?.attempts || 0) > 10) throw createError({ statusCode: 429, statusMessage: 'Too many signup attempts' })

  try {
    await sql`
      INSERT INTO waitlist (email, source, status, consented_at, unsubscribe_token)
      VALUES (${email}, ${source}, 'subscribed', NOW(), ${randomUUID()})
      ON CONFLICT (email) DO UPDATE SET
        source = COALESCE(EXCLUDED.source, waitlist.source),
        status = 'subscribed',
        consented_at = NOW(),
        unsubscribed_at = NULL,
        unsubscribe_token = ${randomUUID()},
        updated_at = NOW()
    `
  } catch (err: any) {
    console.error('[waitlist] DB error:', err)
    throw createError({ statusCode: 500, statusMessage: 'Database error' })
  }

  return { success: true }
})
