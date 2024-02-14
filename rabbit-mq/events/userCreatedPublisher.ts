import { Publisher } from '../../common/src/events/publisher'
import { Queue } from '../../common/src/events/queues'
import { UserCreatedEvent } from '../../common/src/events/user-created-event'

export class UserCreatedPublisher extends Publisher<UserCreatedEvent> {
  constructor() {
    super(Queue.UserCreated)
  }

  handleMessage(message: any): void {
    console.log(`${message}`)
  }
}
