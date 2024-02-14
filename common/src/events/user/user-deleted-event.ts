import { Queue } from '../queues'

export interface UserDeletedEvent {
  queue: Queue.UserDeleted
  data: {
    id: string
  }
}
