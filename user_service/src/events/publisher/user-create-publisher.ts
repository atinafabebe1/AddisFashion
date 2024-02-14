import { Queue, Publisher, UserCreatedEvent } from '@addismen/common'
import { Connection } from 'amqplib'

export class UserCreatedPublisher extends Publisher<UserCreatedEvent> {
  constructor(connection: Connection) {
    super(Queue.UserCreated, connection)
  }

  handleMessage(message: unknown): void {
    console.log(`${message}`)
  }
}
