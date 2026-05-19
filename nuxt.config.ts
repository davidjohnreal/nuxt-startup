// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  modules: ['@nuxt/eslint', '@nuxt/image', '@nuxt/test-utils', '@pinia/nuxt'],
  runtimeConfig: {
    externalApiBase: process.env.EXTERNAL_API_BASE ?? 'http://127.0.0.1:4010',
    mysqlUrl: process.env.MYSQL_URL ?? '',
    postgresUrl: process.env.POSTGRES_URL ?? '',
    authTokenSecret: process.env.AUTH_TOKEN_SECRET ?? 'dev-only-change-me',
    public: {
      externalApiBase: process.env.NUXT_PUBLIC_EXTERNAL_API_BASE ?? 'http://127.0.0.1:4010',
    },
  },
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
