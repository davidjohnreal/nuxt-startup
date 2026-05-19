import { demoOrders } from '../data/mock-database'

export async function listOrdersByUser(userId: string) {
  return demoOrders.filter(order => order.userId === userId)
}
