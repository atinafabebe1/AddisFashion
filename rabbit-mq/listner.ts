// Import necessary libraries
import * as amqp from 'amqplib'

// Define a generic Listener abstract class
abstract class Listener<T> {
  private connection: amqp.Connection | null = null
  private channel: amqp.Channel | null = null
  private readonly exchange: string
  private readonly queue: string

  constructor(exchange: string, queue: string) {
    this.exchange = exchange
    this.queue = queue
  }

  // Connect to RabbitMQ server
  async connect(amqpUrl: string): Promise<void> {
    this.connection = await amqp.connect(amqpUrl)
    this.channel = await this.connection.createChannel()
    await this.channel.assertExchange(this.exchange, 'fanout', {
      durable: false,
    })
    await this.channel.assertQueue(this.queue, { durable: false })
    await this.channel.bindQueue(this.queue, this.exchange, '')
  }

  // Start listening for messages
  async startListening(callback: (data: T) => void): Promise<void> {
    if (!this.connection || !this.channel) {
      throw new Error('Connection not established. Call connect() first.')
    }

    await this.channel.consume(this.queue, (msg) => {
      if (msg) {
        const message = msg.content.toString()
        callback(this.parseMessage(message))
        this.channel!.ack(msg)
      }
    })

    console.log(`Listening for messages on queue: ${this.queue}`)
  }

  // Abstract method to be implemented by concrete listeners
  abstract parseMessage(message: string): T

  // Close the connection
  async closeConnection(): Promise<void> {
    if (this.connection) {
      await this.connection.close()
      this.connection = null
      this.channel = null
      console.log('Connection closed')
    }
  }
}

// Example usage
class UserCreatedEventListener extends Listener<{
  userId: string
  username: string
}> {
  parseMessage(message: string): { userId: string; username: string } {
    return JSON.parse(message)
  }
}

// Instantiate the listener
const userCreatedListener = new UserCreatedEventListener(
  'user_exchange',
  'user_created_queue',
)

;(async () => {
  try {
    const amqpUrl = 'amqp://guest:guest@localhost'
    await userCreatedListener.connect(amqpUrl)

    userCreatedListener.startListening((data) => {
      console.log('User Created:', data)
    })
  } catch (error) {
    console.error('Error:', error)
  } finally {
    await userCreatedListener.closeConnection()
  }
})()
