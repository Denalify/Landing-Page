import { useDb, ensureWaitlistTable } from '../utils/db'

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

  const rawSource = body?.source ?? null
  const source = rawSource && VALID_SOURCES.includes(rawSource) ? rawSource : null

  const sql = useDb()
  await ensureWaitlistTable()

  try {
    await sql`
      INSERT INTO waitlist (email, source)
      VALUES (${email}, ${source})
    `
  } catch (err: any) {
    if (err?.code === '23505') {
      return { success: true }
    }
    console.error('[waitlist] DB error:', err)
    throw createError({ statusCode: 500, statusMessage: 'Database error' })
  }

  return { success: true }
})
