import { OrderCancelledPublisher } from './../event/order-cancelled-publisher'
import { Router, Request, Response } from 'express'
import {
  requireAuth,
  NotfoundError,
  NotAuthorizedError,
} from '@addismen/common'
import { Order } from '../model/order'
import { rabbitMQConnection } from '../../rabbitmq-connection'

const router = Router()

router.post(
  '/api/order/cancel/:orderId',
  requireAuth,
  async (req: Request, res: Response) => {
    const { orderId } = req.params

    const cancelledOrder = await Order.findById(orderId)
    if (!cancelledOrder) {
      throw new NotfoundError()
    }
    if (cancelledOrder.userId !== req.currentUser!.id) {
      throw new NotAuthorizedError()
    }

    cancelledOrder.status = 'cancelled'

    await cancelledOrder.save()
    const publisher = new OrderCancelledPublisher(rabbitMQConnection.connection)
    await publisher.intializeChannel()

    publisher.publish({
      orderId: cancelledOrder.id,
      userId: cancelledOrder.userId,
    })
    res.status(200).json({ message: 'Order cancelled successfully' })
  },
)

export { router as cancelOrderRouter }
