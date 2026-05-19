import { createInquiry, listInquiries } from '../../services/inquiryRepository'

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
      statusMessage: 'name and product are required',
    })
  }

  const inquiry = await createInquiry({
    name: body.name,
    product: body.product,
    message: body.message,
  })

  return {
    ok: true,
    source: 'mock-database',
    inquiry,
    total: (await listInquiries()).length,
  }
})
