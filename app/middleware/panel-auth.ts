export default defineNuxtRouteMiddleware(async (to) => {
  if (!to.path.startsWith('/panel') || to.path === '/panel/login') return

  try {
    const request = import.meta.server ? useRequestFetch() : $fetch
    const result = await request<{ authenticated: boolean; csrfToken: string }>('/api/panel/check')
    useState('panel-csrf', () => '').value = result.csrfToken
  } catch {
    return navigateTo('/panel/login')
  }
})
