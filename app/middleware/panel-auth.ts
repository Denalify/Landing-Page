export default defineNuxtRouteMiddleware(async (to) => {
  if (!to.path.startsWith('/panel') || to.path === '/panel/login') return

  try {
    await $fetch('/api/panel/check')
  } catch {
    return navigateTo('/panel/login')
  }
})
