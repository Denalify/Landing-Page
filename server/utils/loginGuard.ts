import { createHash, createHmac } from 'node:crypto'
import type { H3Event } from 'h3'
import { ensureNewsletterTables, useDb } from './db'

const MAX_ATTEMPTS = 5

function loginKey(event: H3Event, username: string) {
  const ip = getRequestIP(event, { xForwardedFor: true }) || 'unknown'
  return createHash('sha256').update(`${ip}:${username.toLowerCase()}`).digest('hex')
}

export async function assertLoginAllowed(event: H3Event, username: string) {
  await ensureNewsletterTables()
  const sql = useDb()
  await sql`DELETE FROM panel_login_attempts WHERE window_started_at < NOW() - INTERVAL '1 day' AND (blocked_until IS NULL OR blocked_until < NOW())`
  const [row] = await sql<{ blocked_until: string | null }[]>`
    SELECT blocked_until FROM panel_login_attempts WHERE key = ${loginKey(event, username)}
  `
  if (row?.blocked_until && new Date(row.blocked_until) > new Date()) {
    throw createError({ statusCode: 429, statusMessage: 'Too many attempts. Try again later.' })
  }
}

export async function recordLoginFailure(event: H3Event, username: string) {
  const sql = useDb()
  const key = loginKey(event, username)
  await sql`
    INSERT INTO panel_login_attempts (key, attempts, window_started_at)
    VALUES (${key}, 1, NOW())
    ON CONFLICT (key) DO UPDATE SET
      attempts = CASE WHEN panel_login_attempts.window_started_at < NOW() - INTERVAL '15 minutes' THEN 1 ELSE panel_login_attempts.attempts + 1 END,
      window_started_at = CASE WHEN panel_login_attempts.window_started_at < NOW() - INTERVAL '15 minutes' THEN NOW() ELSE panel_login_attempts.window_started_at END,
      blocked_until = CASE
        WHEN panel_login_attempts.window_started_at >= NOW() - INTERVAL '15 minutes' AND panel_login_attempts.attempts + 1 >= ${MAX_ATTEMPTS}
        THEN NOW() + INTERVAL '15 minutes'
        ELSE NULL
      END
  `
}

export async function clearLoginFailures(event: H3Event, username: string) {
  await useDb()`DELETE FROM panel_login_attempts WHERE key = ${loginKey(event, username)}`
}

function decodeBase32(value: string) {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567'
  const normalized = value.toUpperCase().replace(/[^A-Z2-7]/g, '')
  let bits = ''
  for (const char of normalized) bits += alphabet.indexOf(char).toString(2).padStart(5, '0')
  const bytes: number[] = []
  for (let index = 0; index + 8 <= bits.length; index += 8) bytes.push(Number.parseInt(bits.slice(index, index + 8), 2))
  return Buffer.from(bytes)
}

function totpAt(secret: string, counter: number) {
  const buffer = Buffer.alloc(8)
  buffer.writeBigUInt64BE(BigInt(counter))
  const digest = createHmac('sha1', decodeBase32(secret)).update(buffer).digest()
  const offset = digest[digest.length - 1]! & 0x0f
  const code = (digest.readUInt32BE(offset) & 0x7fffffff) % 1_000_000
  return code.toString().padStart(6, '0')
}

export function verifyTotp(secret: string, code: string) {
  if (!/^\d{6}$/.test(code)) return false
  const counter = Math.floor(Date.now() / 30_000)
  return [-1, 0, 1].some((offset) => totpAt(secret, counter + offset) === code)
}
