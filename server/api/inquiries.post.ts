interface InquiryBody {
  name?: string
  product?: string
  message?: string
}

export default defineEventHandler(async (event) => {
  const body = await readBody<InquiryBody>(event)

  if (!body.name || !body.product) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Name and product are required',
    })
  }

  return {
    ok: true,
    inquiry: {
      id: crypto.randomUUID(),
      name: body.name,
      product: body.product,
      message: body.message ?? '',
      createdAt: new Date().toISOString(),
    },
  }
})
