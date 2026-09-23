import { requirePanelAuth } from '../../utils/auth'

export default defineEventHandler(async (event) => {
  const session = await requirePanelAuth(event)
  return { authenticated: true, csrfToken: session.data.csrfToken }
})
