import { Router, Request, Response } from 'express'
import { param } from 'express-validator'
import { Product } from '../models/product'
import { BadRequestError, validateRequest } from '@addismen/common'
import { ProductUpdatedPublisher } from '../events/publisher/product-updated-publisher'
import { rabbitMQConnection } from '../../rabbitmq-connection'

const router = Router()

const updateProductValidationRules = [
  param('productId').notEmpty().withMessage('Product ID is required'),
]

router.put(
  '/api/product/update/:productId',
  updateProductValidationRules,
  validateRequest,
  async (req: Request, res: Response) => {
    const productId = req.params.productId

    const product = await Product.findById(productId)

    if (!product) {
      throw new BadRequestError('Product not found')
    }

    try {
      const updatedProduct = await Product.findByIdAndUpdate(
        productId,
        {
          ...req.body,
        },
        { new: true },
      )

      if (!updatedProduct) {
        throw new BadRequestError('Failed to update product')
      }
      const publisher = new ProductUpdatedPublisher(
        rabbitMQConnection.connection,
      )
      await publisher.intializeChannel()

      publisher.publish({
        id: updatedProduct.id,
        name: updatedProduct.name,
        price: updatedProduct.price,
        userId: updatedProduct.userId?.toString() || '',
      })

      res
        .status(200)
        .json({ message: 'Product updated successfully', updatedProduct })
    } catch (error) {
      console.error(error)
      throw new BadRequestError('Failed to update product')
    }
  },
)

export { router as updateProductRouter }
