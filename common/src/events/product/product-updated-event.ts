import { Queue } from '../queues'

export interface ProductUpdatedEvent {
  queue: Queue.ProductUpdated
  data: {
    id: string
    name: string
    price: string
    userId: string
  }
}
