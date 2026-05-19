import { createLead } from '../../services/sqlDemoRepository'
import { parseSqlProvider } from '../../utils/sqlProvider'

interface LeadBody {
  provider?: string
  name?: string
  product?: string
  message?: string
}

export default defineEventHandler(async (event) => {
  const body = await readBody<LeadBody>(event)
  const provider = parseSqlProvider(body.provider)

  if (!body.name || !body.product) {
    throw createError({
      statusCode: 400,
      statusMessage: 'name and product are required',
    })
  }

  try {
    const result = await createLead(provider, {
      name: body.name.slice(0, 120),
      product: body.product.slice(0, 160),
      message: body.message?.slice(0, 1000) ?? '',
    })

    return {
      ok: true,
      ...result,
    }
  }
  catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: `Failed to insert ${provider} lead`,
      cause: error,
    })
  }
})
