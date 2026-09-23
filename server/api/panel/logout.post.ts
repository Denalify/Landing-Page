import { requirePanelAuth } from '../../utils/auth'

export default defineEventHandler(async (event) => {
  const session = await requirePanelAuth(event, true)
  await session.clear()
  return { success: true }
})
