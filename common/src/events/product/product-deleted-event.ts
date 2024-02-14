import { Queue } from '../queues'

export interface ProductDeletedEvent {
  queue: Queue.ProductDeleted
  data: {
    id: string
  }
}
