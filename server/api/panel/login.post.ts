import { loginGuard } from '../../utils/loginGuard'

export default defineEventHandler(async (event) => {
  // Reject immediately if panel is already locked
  loginGuard.assertNotLocked()

  const { username, password } = await readBody(event)
  const config = useRuntimeConfig()

  if (!config.sessionSecret) {
    throw createError({ statusCode: 500, statusMessage: 'SESSION_SECRET is not configured' })
  }

  if (
    username !== config.adminUsername ||
    password !== config.adminPassword
  ) {
    await new Promise(r => setTimeout(r, 500))
    loginGuard.recordFailure()

    if (loginGuard.isLocked) {
      throw createError({
        statusCode: 423,
        statusMessage: 'Panel locked. Restart the server to regain access.',
      })
    }

    throw createError({
      statusCode: 401,
      statusMessage: `Invalid credentials. ${loginGuard.attemptsLeft} attempt${loginGuard.attemptsLeft === 1 ? '' : 's'} remaining.`,
    })
  }

  loginGuard.recordSuccess()

  const session = await useSession(event, { password: config.sessionSecret })
  await session.update({ authenticated: true })

  return { success: true }
})
