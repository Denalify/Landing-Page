import { requirePanelAuth } from '../../utils/auth'
import { loginGuard } from '../../utils/loginGuard'

export default defineEventHandler(async (event) => {
  loginGuard.assertNotLocked()
  await requirePanelAuth(event)
  return { authenticated: true }
})
