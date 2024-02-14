import { Queue, Publisher, OrderPlacedEvent } from '@addismen/common'

export class OrderPlacedPublisher extends Publisher<OrderPlacedEvent> {
  constructor(connection: any) {
    super(Queue.OrderPlaced, connection)
  }

  handleMessage(message: any): void {
    console.log(`${message}`)
  }
}
