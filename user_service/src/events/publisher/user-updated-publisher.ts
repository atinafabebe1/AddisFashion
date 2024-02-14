import { Queue, Publisher, UserUpdatedEvent } from '@addismen/common'
import { Connection } from 'amqplib'

export class UserUpdatedPublisher extends Publisher<UserUpdatedEvent> {
  constructor(connection: Connection) {
    super(Queue.UserUpdated, connection)
  }

  handleMessage(message: unknown): void {
    console.log(`${message}`)
  }
}
