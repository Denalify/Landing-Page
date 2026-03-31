import { requirePanelAuth } from '../../utils/auth'

export default defineEventHandler(async (event) => {
  await requirePanelAuth(event)
  return { authenticated: true }
})
