import type { H3Event } from 'h3'

export function getClientIp(event: H3Event): string | null {
  const forwarded = getHeader(event, 'x-forwarded-for')
  if (forwarded) return forwarded.split(',')[0].trim()
  const realIp = getHeader(event, 'x-real-ip')
  if (realIp) return realIp.trim()
  return getRequestIP(event) ?? null
}

export async function resolveCountry(event: H3Event): Promise<string | null> {
  // 1. Cloudflare
  const cf = getHeader(event, 'cf-ipcountry')
  if (cf && cf !== 'XX' && cf !== 'T1') return cf.toUpperCase()

  // 2. Vercel
  const vercel = getHeader(event, 'x-vercel-ip-country')
  if (vercel) return vercel.toUpperCase()

  // 3. Fallback: free IP lookup (2s timeout)
  const ip = getClientIp(event)
  if (!ip || ip === '127.0.0.1' || ip === '::1' || ip.startsWith('192.168.') || ip.startsWith('10.')) {
    return null
  }

  try {
    const res = await fetch(`http://ip-api.com/json/${ip}?fields=countryCode`, {
      signal: AbortSignal.timeout(2000),
    })
    if (!res.ok) return null
    const data = await res.json() as { countryCode?: string }
    return data.countryCode?.toUpperCase() ?? null
  } catch {
    return null
  }
}
