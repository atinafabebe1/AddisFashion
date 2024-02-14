import { Queue, Publisher, OrderFulfilledEvent } from '@addismen/common'

export class OrderFulfilledPublisher extends Publisher<OrderFulfilledEvent> {
  constructor(connection: any) {
    super(Queue.OrderFulfilled, connection)
  }

  handleMessage(message: any): void {
    console.log(`${message}`)
  }
}
