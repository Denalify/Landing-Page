import { requirePanelAuth } from '../../../utils/auth'
import { sendNewsletterMail } from '../../../utils/mail'
import { documentText, normalizeDocument, renderNewsletterEmail } from '../../../utils/newsletter'

export default defineEventHandler(async (event) => {
  await requirePanelAuth(event, true)
  const body = await readBody(event)
  const email = useRuntimeConfig().newsletterTestEmail
  const subject = typeof body?.subject === 'string' ? body.subject.trim().slice(0, 150) : ''
  const previewText = typeof body?.previewText === 'string' ? body.previewText.trim().slice(0, 220) : ''
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !subject) {
    throw createError({ statusCode: 500, statusMessage: 'The newsletter test address is not configured' })
  }
  const content = normalizeDocument(body?.content)
  await sendNewsletterMail({
    to: email,
    subject: `[TEST] ${subject}`,
    html: renderNewsletterEmail(content, previewText),
    text: `${documentText(content)}\n\nThis is a test message from Denalify.`,
  })
  return { success: true }
})
