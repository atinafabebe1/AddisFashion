import mongoose, { Document, Schema, Model } from 'mongoose'
import { ICategory } from './categories'

export interface IProduct extends Document {
  userId: Schema.Types.ObjectId | undefined
  name: string
  description: string
  category: ICategory['_id']
  brand: string
  price: string
  sizesAvailable?: string[]
  colorsAvailable?: string[]
  images?: string[]
  availability: boolean
  quantity: number
  discountsPromotions?: string[]
  shippingInformation: string
  customerReviews?: string
  ratings?: number
  tagsKeywords?: string[]
  relatedProducts?: string[]
}

interface IProductModel extends Model<IProduct> {
  build(attrs: IProduct): IProduct
}

const productSchema = new Schema<IProduct>(
  {
    userId: { type: Schema.Types.ObjectId, required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
    brand: { type: String },
    price: { type: String },
    sizesAvailable: { type: [String] },
    colorsAvailable: { type: [String] },
    images: { type: [String] },
    availability: { type: Boolean },
    discountsPromotions: { type: [String] },
    shippingInformation: { type: String },
    customerReviews: { type: String },
    quantity: { type: Number },
    ratings: { type: Number },
    tagsKeywords: { type: [String] },
    relatedProducts: { type: [String] },
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id
        delete ret._id
        delete ret.__v
      },
    },
  },
)

// Create the Product model
productSchema.statics.build = (attrs: IProduct) => {
  return new Product(attrs)
}

const Product = mongoose.model<IProduct, IProductModel>(
  'Product',
  productSchema,
)

export { Product }
