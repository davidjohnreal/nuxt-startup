export interface DemoOrder {
  id: string
  userId: string
  product: string
  total: number
  status: 'paid' | 'shipping' | 'completed'
}

export interface DemoInquiry {
  id: string
  name: string
  product: string
  message: string
  createdAt: string
}

export const demoOrders: DemoOrder[] = [
  {
    id: 'order-2026-001',
    userId: 'user-ada',
    product: 'Orion Phone Ultra',
    total: 6999,
    status: 'shipping',
  },
  {
    id: 'order-2026-002',
    userId: 'user-ada',
    product: 'Pulse Watch S',
    total: 1599,
    status: 'completed',
  },
]

export const demoInquiries: DemoInquiry[] = []
