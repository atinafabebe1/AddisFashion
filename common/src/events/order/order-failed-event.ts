import { Queue } from '../queues'

export interface OrderFailedEvent {
  queue: Queue.OrderFailed
  data: {
    orderId: string
    userId: string
    failureReason: string
  }
}
