import { Router, Request, Response } from 'express'
import { body, param } from 'express-validator'
import { Category, ICategory } from '../models/categories'
import { validateRequest } from '@addismen/common'

const router = Router()

// Validation rules for updating a category
const updateCategoryValidationRules = [
  param('categoryId').notEmpty().withMessage('Category ID is required'),
  body('name').notEmpty().withMessage('New category name is required'),
]

router.put(
  '/api/category/update/:categoryId',
  updateCategoryValidationRules,
  validateRequest,
  async (req: Request, res: Response) => {
    const categoryId = req.params.categoryId
    const updatedCategoryName = req.body.name

    const category = await Category.findById(categoryId)

    if (!category) {
      return res.status(404).json({ message: 'Category not found' })
    }

    category.name = updatedCategoryName

    await category.save()

    res.status(200).json({ message: 'Category updated successfully', category })
  },
)

export { router as updateCategoryRouter }
