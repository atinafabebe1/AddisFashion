import { Queue, Publisher, UserDeletedEvent } from '@addismen/common'
import { Connection } from 'amqplib'

export class UserDeletedPublisher extends Publisher<UserDeletedEvent> {
  constructor(connection: Connection) {
    super(Queue.UserDeleted, connection)
  }

  handleMessage(message: unknown): void {
    console.log(`${message}`)
  }
}
