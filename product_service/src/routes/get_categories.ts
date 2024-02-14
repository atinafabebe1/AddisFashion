import { Router, Request, Response } from 'express'
import { Category, ICategory } from '../models/categories'
import { advancedResults } from '@addismen/common'

const router = Router()

router.get(
  '/api/category/get',
  advancedResults<ICategory>(Category),
  async (req, res) => {
    res.json(res.advancedResult)
  },
)

export { router as getCategoryRouter }
