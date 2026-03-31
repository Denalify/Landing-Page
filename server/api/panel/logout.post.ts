import { requirePanelAuth } from '../../utils/auth'

export default defineEventHandler(async (event) => {
  await requirePanelAuth(event)
  const config = useRuntimeConfig()
  const session = await useSession(event, { password: config.sessionSecret })
  await session.clear()
  return { success: true }
})
