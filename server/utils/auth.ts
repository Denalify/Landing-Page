import type { H3Event } from 'h3'

export async function requirePanelAuth(event: H3Event) {
  const config = useRuntimeConfig()
  const session = await useSession(event, { password: config.sessionSecret })

  if (!session.data.authenticated) {
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
  }
}
