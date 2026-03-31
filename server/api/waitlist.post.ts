import { useDb, ensureWaitlistTable } from '../utils/db'
import { getClientIp, resolveCountry } from '../utils/geo'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const email = (body?.email ?? '').trim().toLowerCase()

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid email address' })
  }

  const ip = getClientIp(event)
  const country = await resolveCountry(event)

  const sql = useDb()
  await ensureWaitlistTable()

  try {
    await sql`
      INSERT INTO waitlist (email, ip, country)
      VALUES (${email}, ${ip}, ${country})
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
