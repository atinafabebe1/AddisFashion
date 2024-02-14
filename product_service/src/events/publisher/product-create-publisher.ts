import { Queue, Publisher, ProductCreatedEvent } from '@addismen/common'

export class ProductCreatedPublisher extends Publisher<ProductCreatedEvent> {
  constructor(connection: any) {
    super(Queue.ProdcutCreated, connection)
  }

  handleMessage(message: any): void {
    console.log(`${message}`)
  }
}
