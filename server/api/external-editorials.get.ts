interface ExternalEditorialsResponse {
  source: string
  count: number
  articles: Array<{
    id: string
    slug: string
    title: string
    source: string
    summary: string
    body: string
  }>
}

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const source = typeof query.source === 'string' ? query.source : undefined
  const config = useRuntimeConfig()

  try {
    return await $fetch<ExternalEditorialsResponse>('/editorials', {
      baseURL: config.externalApiBase,
      query: source ? { source } : undefined,
    })
  }
  catch (error) {
    throw createError({
      statusCode: 502,
      statusMessage: 'External editorial service unavailable',
      cause: error,
    })
  }
})
