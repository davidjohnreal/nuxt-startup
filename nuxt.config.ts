// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  modules: ['@nuxt/eslint', '@nuxt/image', '@nuxt/test-utils', '@pinia/nuxt'],
  image: {
    provider: 'ipx',
    domains: ['images.unsplash.com'],
  },
  routeRules: {
    '/learn/rendering': { prerender: true },
    '/products/**': { swr: 3600 },
    '/admin/**': { ssr: false },
    '/account': { ssr: false },
    '/account/**': { ssr: false },
  },
})
