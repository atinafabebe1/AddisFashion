import { Queue } from '../queues'

export interface PaymentProcessedEvent {
  queue: Queue.PaymentProcessed
  data: {
    orderId: string
    paymentStatus: string
  }
}
