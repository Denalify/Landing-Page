export type RichTextNode = {
  type?: string
  text?: string
  attrs?: Record<string, string | number | boolean | null | undefined>
  marks?: Array<{ type?: string; attrs?: Record<string, string | number | boolean | null | undefined> }>
  content?: RichTextNode[]
}

const allowedNodes = new Set(['doc', 'paragraph', 'heading', 'bulletList', 'orderedList', 'listItem', 'blockquote', 'horizontalRule', 'hardBreak', 'text'])
const allowedMarks = new Set(['bold', 'italic', 'underline', 'strike', 'link'])

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]!)
}

function safeLink(value: unknown) {
  if (typeof value !== 'string') return null
  try {
    const url = new URL(value)
    return ['https:', 'http:', 'mailto:'].includes(url.protocol) ? value : null
  } catch {
    return null
  }
}

export function normalizeDocument(value: unknown): RichTextNode {
  let nodes = 0
  let textLength = 0

  const visit = (input: unknown): RichTextNode => {
    if (!input || typeof input !== 'object') throw createError({ statusCode: 400, statusMessage: 'Invalid email content' })
    const raw = input as RichTextNode
    if (!raw.type || !allowedNodes.has(raw.type)) throw createError({ statusCode: 400, statusMessage: 'Unsupported email content' })
    if (++nodes > 1000) throw createError({ statusCode: 400, statusMessage: 'Email content is too large' })

    const output: RichTextNode = { type: raw.type }
    if (raw.type === 'text') {
      output.text = typeof raw.text === 'string' ? raw.text : ''
      textLength += output.text.length
      if (textLength > 100_000) throw createError({ statusCode: 400, statusMessage: 'Email content is too large' })
      output.marks = (raw.marks || [])
        .filter((mark) => mark.type && allowedMarks.has(mark.type))
        .map((mark) => {
          if (mark.type !== 'link') return { type: mark.type }
          const href = safeLink(mark.attrs?.href)
          return href ? { type: 'link', attrs: { href } } : { type: undefined }
        })
        .filter((mark) => mark.type)
    }
    if (raw.type === 'heading') output.attrs = { level: Math.min(3, Math.max(1, Number(raw.attrs?.level) || 2)), textAlign: raw.attrs?.textAlign }
    if (raw.type === 'paragraph') output.attrs = { textAlign: raw.attrs?.textAlign }
    if (raw.content) output.content = raw.content.map(visit)
    return output
  }

  const document = visit(value)
  if (document.type !== 'doc') throw createError({ statusCode: 400, statusMessage: 'Invalid email document' })
  return document
}

function renderNode(node: RichTextNode): string {
  if (node.type === 'text') {
    let result = escapeHtml(node.text || '')
    for (const mark of node.marks || []) {
      if (mark.type === 'bold') result = `<strong>${result}</strong>`
      if (mark.type === 'italic') result = `<em>${result}</em>`
      if (mark.type === 'underline') result = `<u>${result}</u>`
      if (mark.type === 'strike') result = `<s>${result}</s>`
      if (mark.type === 'link') result = `<a href="${escapeHtml(String(mark.attrs?.href || ''))}" style="color:#4b9bfa;text-decoration:underline">${result}</a>`
    }
    return result
  }

  const children = (node.content || []).map(renderNode).join('')
  const align = ['left', 'center', 'right'].includes(String(node.attrs?.textAlign)) ? `text-align:${node.attrs?.textAlign};` : ''
  if (node.type === 'doc') return children
  if (node.type === 'paragraph') return `<p style="margin:0 0 18px;line-height:1.7;${align}">${children || '&nbsp;'}</p>`
  if (node.type === 'heading') {
    const level = Math.min(3, Math.max(1, Number(node.attrs?.level) || 2))
    const sizes = ['32px', '25px', '20px']
    return `<h${level} style="margin:28px 0 14px;font-size:${sizes[level - 1]};line-height:1.2;letter-spacing:-0.02em;${align}">${children}</h${level}>`
  }
  if (node.type === 'bulletList') return `<ul style="margin:0 0 20px;padding-left:24px">${children}</ul>`
  if (node.type === 'orderedList') return `<ol style="margin:0 0 20px;padding-left:24px">${children}</ol>`
  if (node.type === 'listItem') return `<li style="margin:8px 0;line-height:1.6">${children}</li>`
  if (node.type === 'blockquote') return `<blockquote style="margin:24px 0;padding:4px 0 4px 18px;border-left:3px solid #4b9bfa;color:#c5ceda">${children}</blockquote>`
  if (node.type === 'horizontalRule') return '<hr style="border:0;border-top:1px solid #343942;margin:28px 0">'
  if (node.type === 'hardBreak') return '<br>'
  return children
}

export function documentText(node: RichTextNode): string {
  if (node.type === 'text') return node.text || ''
  return (node.content || []).map(documentText).join(node.type === 'paragraph' || node.type === 'heading' ? '\n' : ' ')
}

export function renderNewsletterEmail(document: RichTextNode, previewText: string, unsubscribeUrl?: string) {
  const preheader = escapeHtml(previewText || '')
  const footer = unsubscribeUrl
    ? `You’re receiving this because you subscribed to Denalify updates.<br><a href="${escapeHtml(unsubscribeUrl)}" style="color:#8fa1b8;text-decoration:underline">Unsubscribe</a>`
    : 'This is a test message from the Denalify newsletter editor.'

  return `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>Denalify</title></head><body style="margin:0;background:#0f1115;color:#f3f5f8;font-family:Arial,sans-serif"><div style="display:none;max-height:0;overflow:hidden;opacity:0">${preheader}</div><table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#0f1115"><tr><td align="center" style="padding:36px 16px"><table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:640px"><tr><td style="padding:0 0 24px"><div style="font-size:22px;font-weight:800;letter-spacing:-.03em">DENALIFY<span style="color:#4b9bfa">.</span></div></td></tr><tr><td style="background:#181b20;border:1px solid #343942;border-radius:18px;padding:36px;color:#f3f5f8;font-size:16px">${renderNode(document)}</td></tr><tr><td style="padding:24px 8px;color:#8fa1b8;font-size:12px;line-height:1.6;text-align:center">${footer}<br>© ${new Date().getFullYear()} Denalify</td></tr></table></td></tr></table></body></html>`
}
