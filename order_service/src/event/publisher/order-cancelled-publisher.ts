import { Queue, Publisher, OrderCancelledEvent } from '@addismen/common'

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  constructor(connection: any) {
    super(Queue.OrderCancelled, connection)
  }

  handleMessage(message: any): void {
    console.log(`${message}`)
  }
}
