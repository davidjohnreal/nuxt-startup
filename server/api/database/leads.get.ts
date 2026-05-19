import { listLeads } from '../../services/sqlDemoRepository'
import { parseSqlProvider } from '../../utils/sqlProvider'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const provider = parseSqlProvider(query.provider)
  const keyword = typeof query.keyword === 'string' ? query.keyword.slice(0, 80) : ''

  try {
    const rows = await listLeads(provider, keyword)

    return {
      ok: true,
      provider,
      keyword,
      rows,
    }
  }
  catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: `Failed to query ${provider}`,
      cause: error,
    })
  }
})
