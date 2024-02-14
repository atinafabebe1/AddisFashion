import { Queue } from '../queues'

export interface DeliveryInitiatedEvent {
  queue: Queue.DeliveryInitiated
  data: {
    orderId: string
  }
}
