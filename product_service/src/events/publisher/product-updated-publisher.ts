import { Queue, Publisher, ProductUpdatedEvent } from '@addismen/common'

export class ProductUpdatedPublisher extends Publisher<ProductUpdatedEvent> {
  constructor(connection: any) {
    super(Queue.ProductUpdated, connection)
  }

  handleMessage(message: any): void {
    console.log(`${message}`)
  }
}
