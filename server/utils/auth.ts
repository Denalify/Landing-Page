import { randomBytes, timingSafeEqual } from 'node:crypto'
import type { H3Event } from 'h3'

type PanelSession = {
  authenticated?: boolean
  csrfToken?: string
}

function secureEqual(left: string, right: string) {
  const a = Buffer.from(left)
  const b = Buffer.from(right)
  return a.length === b.length && timingSafeEqual(a, b)
}

export function panelSession(event: H3Event) {
  const config = useRuntimeConfig()
  if (!config.sessionSecret || config.sessionSecret.length < 32) {
    throw createError({ statusCode: 500, statusMessage: 'SESSION_SECRET must contain at least 32 characters' })
  }
  return useSession<PanelSession>(event, {
    password: config.sessionSecret,
    name: 'denalify-panel',
    maxAge: 8 * 60 * 60,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
    },
  })
}

function assertSameOrigin(event: H3Event) {
  const fetchSite = getRequestHeader(event, 'sec-fetch-site')
  if (fetchSite && fetchSite !== 'same-origin') {
    throw createError({ statusCode: 403, statusMessage: 'Cross-site request rejected' })
  }
  const origin = getRequestHeader(event, 'origin')
  if (origin && new URL(origin).host !== getRequestURL(event).host) {
    throw createError({ statusCode: 403, statusMessage: 'Cross-site request rejected' })
  }
}

export async function requirePanelAuth(event: H3Event, mutation = false) {
  const session = await panelSession(event)
  if (!session.data.authenticated) {
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
  }
  if (mutation) {
    assertSameOrigin(event)
    const token = getRequestHeader(event, 'x-csrf-token') || ''
    if (!session.data.csrfToken || !secureEqual(token, session.data.csrfToken)) {
      throw createError({ statusCode: 403, statusMessage: 'Invalid security token' })
    }
  }
  setResponseHeader(event, 'Cache-Control', 'no-store')
  return session
}

export function newCsrfToken() {
  return randomBytes(32).toString('base64url')
}
