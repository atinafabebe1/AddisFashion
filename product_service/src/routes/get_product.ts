import { Router, Request, Response } from 'express'
import { Product, IProduct } from '../models/product'
// import { advancedResults } from '@addismen/common'
import { advancedResults } from '../middlewares/res'

const router = Router()

router.get(
  '/api/product/get',
  advancedResults<IProduct>(Product, 'category'),
  async (req, res) => {
    res.json(res.advancedResult)
  },
)

export { router as getProductRouter }
