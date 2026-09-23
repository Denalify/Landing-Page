import { requirePanelAuth } from '../../../utils/auth'
import { ensureNewsletterTables, useDb } from '../../../utils/db'
import { documentText, normalizeDocument } from '../../../utils/newsletter'

export default defineEventHandler(async (event) => {
  await requirePanelAuth(event, true)
  await ensureNewsletterTables()
  const body = await readBody(event)
  const name = typeof body?.name === 'string' ? body.name.trim().slice(0, 100) : ''
  const subject = typeof body?.subject === 'string' ? body.subject.trim().slice(0, 150) : ''
  const previewText = typeof body?.previewText === 'string' ? body.previewText.trim().slice(0, 220) : ''
  const content = normalizeDocument(body?.content)
  if (!name || !subject || !documentText(content).trim()) {
    throw createError({ statusCode: 400, statusMessage: 'Template name, subject and content are required' })
  }
  const sql = useDb()
  const [template] = await sql<{ id: number }[]>`
    INSERT INTO newsletter_templates (name, subject, preview_text, content)
    VALUES (${name}, ${subject}, ${previewText || null}, ${sql.json(content)})
    ON CONFLICT (name) DO UPDATE SET
      subject = EXCLUDED.subject,
      preview_text = EXCLUDED.preview_text,
      content = EXCLUDED.content,
      updated_at = NOW()
    WHERE newsletter_templates.is_system = FALSE
    RETURNING id
  `
  if (!template) throw createError({ statusCode: 409, statusMessage: 'A built-in template already uses this name' })
  return { id: template.id }
})
