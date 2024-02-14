import { Queue, Publisher, OrderConfirmedEvent } from '@addismen/common'

export class OrderConfirmedPublisher extends Publisher<OrderConfirmedEvent> {
  constructor(connection: any) {
    super(Queue.OrderConfirmed, connection)
  }

  handleMessage(message: any): void {
    console.log(`${message}`)
  }
}
