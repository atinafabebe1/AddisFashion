import { OrderConfirmedPublisher } from './../event/publisher/order-confirmed-publisher'
import { Router, Request, Response } from 'express'
import { body } from 'express-validator'
import { currentUser, requireAuth, validateRequest } from '@addismen/common'
import { rabbitMQConnection } from '../../rabbitmq-connection'
import { Order } from '../model/order'
import { OrderPlacedPublisher } from '../event/publisher/order-placed-publisher'
import { ProdcutAvailibityCheckConsumer } from '../event/consumer/products-availability-checked-publisher'
import { PaymentProcessedConsumer } from '../event/consumer/payment-processed-consumer'

const router = Router()

// const orderValidationRules = []

router.post(
  '/api/order/place',
  // orderValidationRules,
  validateRequest,
  // requireAuth,
  async (req: Request, res: Response) => {
    console.log(req.currentUser)
    const newOrder = Order.build({ ...req.body, userId: req.currentUser!.id })
    await newOrder.save()

    const orderPlacedPublisher = new OrderPlacedPublisher(
      rabbitMQConnection.connection,
    )
    await orderPlacedPublisher.intializeChannel()

    orderPlacedPublisher.publish({
      orderId: newOrder.id,
      userId: newOrder.userId,
      products: [...newOrder.products],
    })

    const productAvailabilityConsumer = new ProdcutAvailibityCheckConsumer(
      rabbitMQConnection.connection,
    )
    productAvailabilityConsumer.consume()

    const orderConfirmedConsumer = new OrderConfirmedPublisher(
      rabbitMQConnection.connection,
    )

    const paymentprocessConsumer = new PaymentProcessedConsumer(
      rabbitMQConnection.connection,
    )

    res.status(201).json({ message: 'Order created successfully' })
  },
)

export { router as placeOrderRouter }
