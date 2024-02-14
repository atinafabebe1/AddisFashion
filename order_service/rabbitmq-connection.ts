import * as amqp from 'amqplib'

class RabbitMQConnection {
  private _connection: amqp.Connection | null = null

  public get connection(): amqp.Connection {
    if (!this._connection)
      throw new Error('RabbitMQ connection not established.')
    return this._connection
  }

  public async connect(url: string): Promise<amqp.Connection> {
    if (this._connection) return this._connection

    try {
      this._connection = await amqp.connect(url)
      console.log('RabbitMQ connected successfully.')
      return this._connection
    } catch (error) {
      console.error('RabbitMQ connection error:', error)
      throw error
    }
  }
}

export const rabbitMQConnection = new RabbitMQConnection()
