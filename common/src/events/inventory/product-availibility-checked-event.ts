import { Queue } from '../queues'

export interface ProdcutAvailibityCheckedEvent {
  queue: Queue.ProdcutAvailibityChecked
  data: {
    productId: string
    status: string
  }
}
