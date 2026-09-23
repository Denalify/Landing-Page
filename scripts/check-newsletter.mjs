import assert from 'node:assert/strict'
import { normalizeDocument, renderNewsletterEmail } from '../server/utils/newsletter.ts'

const document = normalizeDocument({
  type: 'doc',
  content: [{
    type: 'paragraph',
    content: [{ type: 'text', text: 'Hello <team>', marks: [{ type: 'link', attrs: { href: 'javascript:alert(1)' } }] }],
  }],
})
const html = renderNewsletterEmail(document, 'Preview', 'https://denalify.com/unsubscribe?token=test')

assert.match(html, /Hello &lt;team&gt;/)
assert.doesNotMatch(html, /javascript:/)
assert.match(html, /Unsubscribe/)
console.log('Newsletter renderer check passed')
