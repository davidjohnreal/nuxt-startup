export default defineNuxtRouteMiddleware((to) => {
  if (import.meta.server) {
    return
  }

  const token = localStorage.getItem('nuxt-lab-token')

  if (token) {
    return
  }

  return navigateTo({
    path: '/account',
    query: {
      redirect: to.fullPath,
    },
  })
})
