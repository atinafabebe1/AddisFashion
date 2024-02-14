import { Queue, Publisher, ProductDeletedEvent } from '@addismen/common'

export class ProductDeletedPublisher extends Publisher<ProductDeletedEvent> {
  constructor(connection: any) {
    super(Queue.ProductDeleted, connection)
  }

  handleMessage(message: any): void {
    console.log(`${message}`)
  }
}
