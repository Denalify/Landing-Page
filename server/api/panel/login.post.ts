export default defineEventHandler(async (event) => {
  const { username, password } = await readBody(event)
  const config = useRuntimeConfig()

  if (!config.sessionSecret) {
    throw createError({ statusCode: 500, statusMessage: 'SESSION_SECRET is not configured' })
  }

  if (
    username !== config.adminUsername ||
    password !== config.adminPassword
  ) {
    // Slight delay to prevent brute-force timing attacks
    await new Promise(r => setTimeout(r, 500))
    throw createError({ statusCode: 401, statusMessage: 'Invalid credentials' })
  }

  const session = await useSession(event, { password: config.sessionSecret })
  await session.update({ authenticated: true })

  return { success: true }
})
