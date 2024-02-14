import { Queue } from '../queues'

export interface ProductCreatedEvent {
  queue: Queue.ProdcutCreated
  data: {
    id: string
    name: string
    price: string
    userId: string
  }
}
