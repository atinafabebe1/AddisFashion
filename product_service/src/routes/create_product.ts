import express from 'express'
import { Router, Request, Response } from 'express'
import cloudinary from 'cloudinary'
import path from 'path'
import { Product } from '../models/product'
import { ProductCreatedPublisher } from '../events/publisher/product-create-publisher'
import { rabbitMQConnection } from '../../rabbitmq-connection'

const router = Router()
import multer, { FileFilterCallback } from 'multer'
import { requireAuth } from '@addismen/common'

type DestinationCallback = (error: Error | null, destination: string) => void
type FileNameCallback = (error: Error | null, filename: string) => void

export const fileStorage = multer.diskStorage({
  destination: (
    request: Request,
    file: Express.Multer.File,
    callback: DestinationCallback,
  ): void => {
    const uploadPath = path.join(__dirname, '../uploads')
    console.log('Destination:', uploadPath)
    callback(null, uploadPath)
  },

  filename: (
    req: Request,
    file: Express.Multer.File,
    callback: FileNameCallback,
  ): void => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
    callback(null, file.fieldname + '-' + uniqueSuffix)
  },
})

export const fileFilter = (
  request: Request,
  file: Express.Multer.File,
  callback: FileFilterCallback,
): void => {
  if (
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/jpeg'
  ) {
    callback(null, true)
  } else {
    console.log('File Filter Error: Invalid file type')
    callback(new Error('Invalid file type') as unknown as null, false)
  }
}

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || '',
  api_key: process.env.CLOUDINARY_API_KEY || '',
  api_secret: process.env.CLOUDINARY_API_SECRET || '',
})

const uploadFiles = multer({
  storage: fileStorage,
  fileFilter: fileFilter,
}).array('images', 5)

router.post(
  '/api/product/create',
  (req: Request, res: Response, next: any) => {
    next()
  },
  requireAuth,
  (req: Request, res: Response, next: any) => {
    uploadFiles(req, res, (err: any) => {
      if (err) {
        console.error('Multer Error:', err)
        return res.status(400).json({ message: 'Multer error', error: err })
      }
      next()
    })
  },
  async (req: Request, res: Response) => {
    console.log(req.currentUser)
    try {
      if (!req.files || req.files.length === 0) {
        console.log('Error: No files uploaded')
        return res.status(400).json({ message: 'No files uploaded' })
      }

      const pictureFiles = req.files as Express.Multer.File[]

      let imageResponses: string[] = []

      await Promise.all(
        pictureFiles.map(async (picture) => {
          try {
            const response = await cloudinary.v2.uploader.upload(picture.path, {
              folder: 'uploads',
            })
            imageResponses.push(response.secure_url) // Return the secure URL of the uploaded image
          } catch (error) {
            console.error('Error uploading image to Cloudinary:', error)
            throw new Error('Error uploading images to Cloudinary')
          }
        }),
      )

      console.log(imageResponses)
      console.log(req.currentUser)
      const newProduct = Product.build({
        userId: req.currentUser?.id,
        ...req.body,
        images: imageResponses,
      })

      await newProduct.save()

      const publisher = new ProductCreatedPublisher(
        rabbitMQConnection.connection,
      )
      await publisher.intializeChannel()

      publisher.publish({
        id: newProduct.id,
        name: newProduct.name,
        price: newProduct.price,
        userId: newProduct.userId?.toString() || '',
      })

      console.log('Product:', newProduct) // Log created product

      res.status(201).json({
        message: 'Product created successfully',
        product: newProduct,
        images: imageResponses,
      })
    } catch (error) {
      console.error('Error:', error) // Log any error
      res.status(500).json({ message: 'Error uploading images' })
    }
  },
)

export { router as createProductRouter }
