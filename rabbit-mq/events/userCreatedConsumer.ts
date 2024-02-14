import { Message } from 'amqplib'
import { Consumer } from '../../common/src/events/consumer'
import { UserCreatedEvent } from '../../common/src/events/user-created-event'
import { Queue } from '../../common/src/events/queues'

export class UserCreatedConsumer extends Consumer<UserCreatedEvent> {
  constructor() {
    super(Queue.UserCreated)
  }

  onMessage(message: Message): void {
    const userCreatedEvent: UserCreatedEvent = JSON.parse(
      message.content.toString(),
    )

    console.log(`User ID: ${userCreatedEvent.data.id}`)

    this.ack(message)
  }
}
