import { Queue, Consumer, PaymentProcessedEvent } from '@addismen/common'

export class PaymentProcessedConsumer extends Consumer<PaymentProcessedEvent> {
  constructor(connection: any) {
    super(Queue.PaymentProcessed, connection)
  }

  onMessage(message: any): void {
    console.log(`${message}`)
  }
}
