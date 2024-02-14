import { Queue } from '../queues'

export interface OrderFulfilledEvent {
  queue: Queue.OrderFulfilled
  data: {
    orderId: string
    userId: string
    deliveryInfo: string
  }
}
