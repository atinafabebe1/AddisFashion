import * as amqp from 'amqplib'
import { Queue } from './queues'

interface Event {
  queue: Queue
  data: any
}

export abstract class Consumer<T extends Event> {
  private connection: amqp.Connection | null = null
  protected channel: amqp.Channel | null = null
  private queue: T['queue']

  constructor(queue: T['queue'], connection: amqp.Connection) {
    this.queue = queue
  }

  abstract onMessage(message: any): void

  ack(message: amqp.Message): void {
    if (this.channel) {
      this.channel.ack(message)
    }
  }

  async connect(url: string): Promise<void> {
    this.connection = await amqp.connect(url)
    this.channel = await this.connection.createChannel()
    await this.channel.assertQueue(this.queue)
  }

  async consume(): Promise<void> {
    if (!this.channel) {
      throw new Error('Channel not initialized. Call connect method first.')
    }

    await this.channel.consume(this.queue, async (msg) => {
      if (msg) {
        await this.onMessage(msg)
      }
    })
  }

  async close(): Promise<void> {
    if (this.channel) {
      await this.channel.close()
    }

    if (this.connection) {
      await this.connection.close()
    }
  }
}
