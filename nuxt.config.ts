// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  modules: ['@nuxt/eslint', '@nuxt/image', '@nuxt/test-utils', '@pinia/nuxt', '@nuxt/content'],
  runtimeConfig: {
    externalApiBase: process.env.EXTERNAL_API_BASE ?? 'http://127.0.0.1:4010',
    mysqlUrl: process.env.MYSQL_URL ?? '',
    postgresUrl: process.env.POSTGRES_URL ?? '',
    authTokenSecret: process.env.AUTH_TOKEN_SECRET ?? 'dev-only-change-me',
    contentfulSpaceId: process.env.CONTENTFUL_SPACE_ID ?? '',
    contentfulDeliveryToken: process.env.CONTENTFUL_DELIVERY_TOKEN ?? '',
    contentfulContentType: process.env.CONTENTFUL_CONTENT_TYPE ?? 'editorial',
    public: {
      externalApiBase: process.env.NUXT_PUBLIC_EXTERNAL_API_BASE ?? 'http://127.0.0.1:4010',
    },
  },
  content: {
    experimental: {
      nativeSqlite: true,
    },
  },
  image: {
    provider: 'ipx',
    domains: ['images.unsplash.com'],
  },
  nitro: {
    prerender: {
      ignore: [/^\/_ipx\//],
    },
  },
  routeRules: {
    '/': { swr: 3600 },
    '/campaigns/**': { prerender: true },
    '/learn/rendering': { prerender: true },
    '/learn/capstone': { prerender: true },
    '/learn/performance': { ssr: false },
    '/api/editorials': { swr: 300 },
    '/products/**': { swr: 3600 },
    '/admin/**': { ssr: false },
    '/account': { ssr: false },
    '/account/**': { ssr: false },
  },
})
