import { Router, Request, Response } from 'express'
import { Category } from '../models/categories'

const router = Router()

router.delete(
  '/api/category/remove/:categoryId',
  async (req: Request, res: Response) => {
    const categoryId = req.params.categoryId

    const deletedCategory = await Category.findByIdAndDelete(categoryId)

    res
      .status(201)
      .json({ message: 'Category deleted successfully', deletedCategory })
  },
)

export { router as removeCategoryRouter }
