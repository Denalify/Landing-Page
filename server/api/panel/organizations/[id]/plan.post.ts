import { requirePanelAuth } from '../../../../utils/auth'

const GRANTABLE_PLANS = ['startup', 'pro', 'team']

export default defineEventHandler(async (event) => {
  await requirePanelAuth(event, true)
  const config = useRuntimeConfig()
  if (!config.appAdminSecret) throw createError({ statusCode: 500, statusMessage: 'APP_ADMIN_SECRET is not configured' })

  const id = getRouterParam(event, 'id') ?? ''
  if (!/^[0-9a-f]{8}(-[0-9a-f]{4}){3}-[0-9a-f]{12}$/i.test(id)) throw createError({ statusCode: 400, statusMessage: 'Invalid organization' })

  const body = await readBody(event)
  const planId = GRANTABLE_PLANS.includes(body?.planId) ? body.planId as string : null
  const day = typeof body?.until === 'string' ? body.until : ''
  if (day && !/^\d{4}-\d{2}-\d{2}$/.test(day)) throw createError({ statusCode: 400, statusMessage: 'Invalid expiry date' })

  try {
    return await $fetch(`${config.appApiUrl}/admin/organizations/${id}/granted-plan`, {
      method: 'PUT',
      headers: { 'x-admin-secret': config.appAdminSecret },
      body: { planId, until: planId && day ? `${day}T23:59:59.000Z` : null },
    })
  } catch (error: any) {
    throw createError({ statusCode: error?.statusCode === 400 || error?.statusCode === 404 ? error.statusCode : 502, statusMessage: error?.data?.message ?? 'The application API rejected the change' })
  }
})
