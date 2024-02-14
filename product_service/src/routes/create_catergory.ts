import { Router, Request, Response } from 'express'
import { body } from 'express-validator'
import { Category, ICategory, ISubCategory } from '../models/categories'
import { BadRequestError, validateRequest } from '@addismen/common'

const router = Router()

const categoryValidationRules = [
  body('name').notEmpty().withMessage('Category name is required'),
]

router.post(
  '/api/category/create',
  categoryValidationRules,
  validateRequest,
  async (req: Request, res: Response) => {
    let newCategory: ICategory

    if (req.body.parentId) {
      const parentCategory = await Category.findById(req.body.parentId)

      if (!parentCategory) {
        throw new BadRequestError('Parent category not found')
      }

      parentCategory.subcategories = parentCategory.subcategories || []

      newCategory = new Category({ name: req.body.name } as ISubCategory)
      parentCategory.subcategories.push(newCategory)
      await parentCategory.save()

      res.status(201).json({
        message: 'Category created successfully',
        category: parentCategory,
      })
    } else {
      newCategory = new Category({ name: req.body.name } as ICategory)
      await newCategory.save()

      res.status(201).json({
        message: 'Category created successfully',
        category: newCategory,
      })
    }
  },
)

export { router as createCategoryRouter }
