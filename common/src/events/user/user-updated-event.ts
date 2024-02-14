import { Queue } from '../queues'

export interface UserUpdatedEvent {
  queue: Queue.UserUpdated
  data: {
    id: string
  }
}
