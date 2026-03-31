import { useDb, ensureWaitlistTable } from '../utils/db'
import { getClientIp, resolveCountry } from '../utils/geo'

const VALID_SOURCES = [
  'Search engine', 'Facebook', 'YouTube', 'Twitter/X',
  'LinkedIn', 'Reddit', 'Friend / colleague', 'Other',
]

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const email = (body?.email ?? '').trim().toLowerCase()

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid email address' })
  }

  const rawSource = body?.source ?? null
  const source = rawSource && VALID_SOURCES.includes(rawSource) ? rawSource : null

  const ip = getClientIp(event)
  const country = await resolveCountry(event)

  const sql = useDb()
  await ensureWaitlistTable()

  try {
    await sql`
      INSERT INTO waitlist (email, ip, country, source)
      VALUES (${email}, ${ip}, ${country}, ${source})
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
