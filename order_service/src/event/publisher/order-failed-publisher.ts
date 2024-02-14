import { Queue, Publisher, OrderFailedEvent } from '@addismen/common'

export class OrderFailedPublisher extends Publisher<OrderFailedEvent> {
  constructor(connection: any) {
    super(Queue.OrderFailed, connection)
  }

  handleMessage(message: any): void {
    console.log(`${message}`)
  }
}
