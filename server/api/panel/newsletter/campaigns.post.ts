import { requirePanelAuth } from '../../../utils/auth'
import { ensureNewsletterTables, useDb } from '../../../utils/db'
import { documentText, normalizeDocument } from '../../../utils/newsletter'

function text(value: unknown, max: number) {
  return typeof value === 'string' ? value.trim().slice(0, max) : ''
}

export default defineEventHandler(async (event) => {
  await requirePanelAuth(event, true)
  await ensureNewsletterTables()
  const body = await readBody(event)
  const id = Number(body?.id) || null
  const name = text(body?.name, 100)
  const subject = text(body?.subject, 150)
  const previewText = text(body?.previewText, 220)
  const content = normalizeDocument(body?.content)

  if (!name || !subject || !documentText(content).trim()) {
    throw createError({ statusCode: 400, statusMessage: 'Campaign name, subject and content are required' })
  }

  const sql = useDb()
  if (id) {
    const rows = await sql<{ id: number }[]>`
      UPDATE newsletter_campaigns
      SET name = ${name}, subject = ${subject}, preview_text = ${previewText || null}, content = ${sql.json(content)}, updated_at = NOW()
      WHERE id = ${id} AND status = 'draft'
      RETURNING id
    `
    if (!rows.length) throw createError({ statusCode: 409, statusMessage: 'Only draft campaigns can be edited' })
    return { id: rows[0]!.id }
  }

  const [campaign] = await sql<{ id: number }[]>`
    INSERT INTO newsletter_campaigns (name, subject, preview_text, content)
    VALUES (${name}, ${subject}, ${previewText || null}, ${sql.json(content)})
    RETURNING id
  `
  return { id: campaign!.id }
})
