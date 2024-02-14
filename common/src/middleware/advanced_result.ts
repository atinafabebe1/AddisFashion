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
    let query: QueryWithPopulate

    // Copy req.query
    const reqQuery = { ...req.query }
    // Fields to exclude
    const removeFields = ['select', 'sort', 'page', 'limit']

    // Loop over removeFields and delete them from reqQuery
    removeFields.forEach((param) => delete reqQuery[param])

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
    if (req.query.sort) {
      const sortBy = (req.query.sort as string)?.split(',').join(' ')
      query = query.sort(sortBy)
    } else {
      query = query.sort('-createdAt')
    }

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

    let results
    results = await query.exec()

    const pagination: Pagination = {}

    if (endIndex < total) {
      pagination.next = {
        page: page + 1,
        limit,
      }
    }

    if (startIndex > 0) {
      pagination.prev = {
        page: page - 1,
        limit,
      }
    }

    const responseData = {
      success: true,
      count: results.length,
      pagination,
      data: results,
    }

    res.advancedResult = responseData

    next()
  }
