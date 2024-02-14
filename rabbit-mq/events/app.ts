import { UserCreatedPublisher } from './usercreatedPublisher'
import { UserCreatedConsumer } from './userCreatedConsumer'

async function run() {
  const publisher = new UserCreatedPublisher()
  const consumer = new UserCreatedConsumer()

  try {
    await publisher.connect(
      'amqps://xpzbwnft:GAMdewowG9Q6ZbKJeQedVEzydXv4u4mR@armadillo.rmq.cloudamqp.com/xpzbwnft',
    )
    await consumer.connect(
      'amqps://xpzbwnft:GAMdewowG9Q6ZbKJeQedVEzydXv4u4mR@armadillo.rmq.cloudamqp.com/xpzbwnft',
    )

    const user = {
      data: {
        id: '233434',
        username: '233434',
      },
    }
    await publisher.publish(user.data)
    consumer.consume()
  } finally {
    await publisher.close()
    await consumer.close()
  }
}

run()
