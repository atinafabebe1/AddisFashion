import { Queue } from '../queues'

export interface Product {
  productId: string
  quantity: number
  price: string
  name: string
}

export interface OrderPlacedEvent {
  queue: Queue.OrderPlaced
  data: {
    orderId: string
    userId: string
    products: Product[]
  }
}
