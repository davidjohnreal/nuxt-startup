import { demoInquiries } from '../data/mock-database'

interface CreateInquiryInput {
  name: string
  product: string
  message?: string
}

export async function createInquiry(input: CreateInquiryInput) {
  const inquiry = {
    id: `inq-${Date.now()}`,
    name: input.name,
    product: input.product,
    message: input.message ?? '',
    createdAt: new Date().toISOString(),
  }

  demoInquiries.unshift(inquiry)

  return inquiry
}

export async function listInquiries() {
  return demoInquiries
}
