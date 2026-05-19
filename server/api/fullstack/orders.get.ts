import { listOrdersByUser } from '../../services/orderRepository'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const userId = typeof query.userId === 'string' ? query.userId : 'user-ada'
  const orders = await listOrdersByUser(userId)

  return {
    source: 'mock-database',
    userId,
    count: orders.length,
    orders,
  }
})
