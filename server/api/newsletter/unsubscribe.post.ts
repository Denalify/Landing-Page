import { ensureNewsletterTables, useDb } from '../../utils/db'

export default defineEventHandler(async (event) => {
  await ensureNewsletterTables()
  const body = await readBody(event).catch(() => ({}))
  const query = getQuery(event)
  const token = typeof body?.token === 'string' ? body.token : typeof query.token === 'string' ? query.token : ''
  if (token && token.length <= 128) {
    await useDb()`
      UPDATE waitlist
      SET status = 'unsubscribed', unsubscribed_at = NOW(), updated_at = NOW()
      WHERE unsubscribe_token = ${token}
    `
  }
  setResponseHeader(event, 'Cache-Control', 'no-store')
  return { success: true }
})
