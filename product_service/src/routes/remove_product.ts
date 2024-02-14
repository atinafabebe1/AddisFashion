import { ProductDeletedPublisher } from './../events/publisher/product-deleted-publisher'
import { Router, Request, Response } from 'express'
import { Product } from '../models/product'
import { rabbitMQConnection } from '../../rabbitmq-connection'
import { BadRequestError } from '@addismen/common'

const router = Router()

router.delete(
  '/api/product/remove/:productId',
  async (req: Request, res: Response) => {
    const productId = req.params.productId

    const deletedProdcut = await Product.findByIdAndDelete(productId)

    if (!deletedProdcut) {
      throw new BadRequestError('Failed to delete product')
    }

    const publisher = new ProductDeletedPublisher(rabbitMQConnection.connection)
    await publisher.intializeChannel()

    publisher.publish({
      id: productId,
    })

    res
      .status(201)
      .json({ message: 'Product deleted successfully', deletedProdcut })
  },
)

export { router as removeProductRouter }
