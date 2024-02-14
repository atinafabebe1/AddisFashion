import { Queue } from '../queues'

export interface UserCreatedEvent {
  queue: Queue.UserCreated
  data: {
    id: string
  }
}
