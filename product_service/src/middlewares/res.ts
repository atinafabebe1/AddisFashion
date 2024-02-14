import { Request, Response, NextFunction } from 'express'
import { Document, Model, Query, PopulatedDoc } from 'mongoose'

interface Pagination {
  next?: {
    page: number
    limit: number
  }
  prev?: {
    page: number
    limit: number
  }
}

declare global {
  namespace Express {
    interface Response {
      advancedResult?: {
        success: boolean
        count: number
        pagination: Pagination
        data: any
      }
    }
  }
}

export type QueryWithPopulate = Query<PopulatedDoc<any, any>, Document>

export const advancedResults =
  <T extends Document>(model: Model<T>, populate: string | null = null) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      let query: QueryWithPopulate

      // Copy req.query
      const { category, ...reqQuery } = req.query

      // Handle category filtering
      if (category) {
        const categoryFieldName = 'category' // Change to the actual field name in your schema
        const categoryName = category as string

        const categoryResult = await model.aggregate([
          {
            $lookup: {
              from: 'categories',
              localField: 'category',
              foreignField: '_id',
              as: 'category',
            },
          },
          {
            $match: {
              'category.name': categoryName,
            },
          },
        ])

        console.log(categoryResult[0]?.category[0]?._id.toString())

        if (categoryResult[0]?.category[0]?._id) {
          reqQuery[`${categoryFieldName}`] =
            categoryResult[0].category[0]._id.toString() as string
          console.log(reqQuery)
        } else {
          res.advancedResult = {
            success: true,
            count: 0,
            pagination: {},
            data: [],
          }
          return next()
        }
      }

      // Create query string
      let queryStr = JSON.stringify(reqQuery)
      queryStr = queryStr.replace(
        /\b(gt|gte|lt|lte|in)\b/g,
        (match) => `$${match}`,
      )

      // Finding resource
      query = model.find(JSON.parse(queryStr))

      // Select Fields
      if (req.query.select) {
        const fields = (req.query.select as string)?.split(',').join(' ')
        query = query.select(fields)
      }

      // Sort
      const sortBy = req.query.sort
        ? (req.query.sort as string)?.split(',').join(' ')
        : '-createdAt'
      query = query.sort(sortBy)

      // Pagination
      const page = parseInt(req.query.page as string, 10) || 1
      const limit = parseInt(req.query.limit as string, 10) || 25
      const startIndex = (page - 1) * limit
      const endIndex = page * limit
      const total = await model.countDocuments(JSON.parse(queryStr))

      query = query.skip(startIndex).limit(limit)

      if (populate) {
        query = query.populate(populate)
      }

      // Execute the query
      let results = await query.exec()

      const pagination: Pagination = {}

      if (endIndex < total) {
        pagination.next = { page: page + 1, limit }
      }

      if (startIndex > 0) {
        pagination.prev = { page: page - 1, limit }
      }

      const responseData = {
        success: true,
        count: results.length,
        pagination,
        data: results,
      }

      res.advancedResult = responseData

      next()
    } catch (error) {
      console.error(error)
      // Handle errors appropriately
      res.status(500).json({
        success: false,
        error: 'Server Error',
      })
    }
  }
