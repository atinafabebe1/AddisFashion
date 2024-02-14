import { Queue } from '../queues'

export interface OrderConfirmedEvent {
  queue: Queue.OrderConfirmed
  data: {
    orderId: string
    userId: string
    totalCost: string
  }
}
