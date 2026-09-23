import { createHash, timingSafeEqual } from 'node:crypto'
import { newCsrfToken, panelSession } from '../../utils/auth'
import { assertLoginAllowed, clearLoginFailures, recordLoginFailure, verifyTotp } from '../../utils/loginGuard'

function secureEqual(left: string, right: string) {
  return timingSafeEqual(createHash('sha256').update(left).digest(), createHash('sha256').update(right).digest())
}

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const username = typeof body?.username === 'string' ? body.username.trim() : ''
  const password = typeof body?.password === 'string' ? body.password : ''
  const otp = typeof body?.otp === 'string' ? body.otp.replace(/\s/g, '') : ''
  const config = useRuntimeConfig()

  if (!config.adminUsername || !config.adminPassword || config.adminPassword.length < 12) {
    throw createError({ statusCode: 500, statusMessage: 'Admin credentials are not securely configured' })
  }
  await assertLoginAllowed(event, username)

  const credentialsValid = secureEqual(username, config.adminUsername) && secureEqual(password, config.adminPassword)
  const otpValid = !config.adminTotpSecret || verifyTotp(config.adminTotpSecret, otp)
  if (!credentialsValid || !otpValid) {
    await new Promise((resolve) => setTimeout(resolve, 500 + Math.floor(Math.random() * 250)))
    await recordLoginFailure(event, username)
    throw createError({ statusCode: 401, statusMessage: 'Invalid credentials or verification code.' })
  }

  await clearLoginFailures(event, username)
  const session = await panelSession(event)
  const csrfToken = newCsrfToken()
  await session.update({ authenticated: true, csrfToken })
  setResponseHeader(event, 'Cache-Control', 'no-store')

  return { success: true, csrfToken }
})
