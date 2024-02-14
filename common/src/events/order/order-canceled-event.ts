import { Queue } from '../queues'

export interface OrderCancelledEvent {
  queue: Queue.OrderCancelled
  data: {
    orderId: string
    userId: string
  }
}
