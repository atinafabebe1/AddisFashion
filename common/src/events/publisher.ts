import * as amqp from 'amqplib'
import { Queue } from './queues'

interface Event {
  queue: Queue
  data: any
}

export abstract class Publisher<T extends Event> {
  private connection: amqp.Connection | null = null
  private channel: amqp.Channel | null = null
  private queue: T['queue']

  constructor(queue: T['queue'], connection: amqp.Connection) {
    this.queue = queue
    this.connection = connection
  }

  abstract handleMessage(message: any): void

  async intializeChannel(): Promise<void> {
    try {
      if (!this.connection) {
        throw new Error(
          'Connection is null. Call connect method with a valid connection first.',
        )
      }

      this.channel = await this.connection.createChannel()
      if (!this.channel) {
        throw new Error('Failed to create channel.')
      }

      await this.channel.assertQueue(this.queue)
      console.log(
        `Connected to RabbitMQ and Queue '${this.queue}' asserted successfully.`,
      )
    } catch (error) {
      console.error('Error during RabbitMQ connection:', error)
      throw error
    }
  }

  async publish(message: T['data']): Promise<void> {
    try {
      if (!this.channel) {
        throw new Error('Channel not initialized. Call connect method first.')
      }

      const messageBuffer = Buffer.from(JSON.stringify(message))
      await this.channel.sendToQueue(this.queue, messageBuffer)
      console.log('Message published successfully.')
    } catch (error) {
      console.error('Error during message publishing:', error)
      throw error
    }
  }

  async close(): Promise<void> {
    try {
      if (this.channel) {
        await this.channel.close()
      }

      if (this.connection) {
        await this.connection.close()
      }

      console.log('Publisher closed successfully.')
    } catch (error) {
      console.error('Error during closing the publisher:', error)
      throw error
    }
  }
}
