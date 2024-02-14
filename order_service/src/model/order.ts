import mongoose, { Document, Schema, Model } from 'mongoose'

interface IOrder extends Document {
  userId: string
  products: Array<{
    productId: string
    name: string
    quantity: number
    price: string
  }>
  totalAmount: number
  shippingAddress: {
    street: string
    city: string
    state: string
    zipCode: string
    country: string
  }
  orderDate: Date
  status: string
  paymentMethod: string
  paymentStatus: string
  notes: string
}

interface OrderModel extends Model<IOrder> {
  build(attrs: IOrder): IOrder
}

const orderSchema = new Schema<IOrder>(
  {
    userId: { type: String, required: true },
    products: [
      {
        productId: { type: String, required: true },
        name: { type: String, required: true },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
      },
    ],
    totalAmount: { type: Number, required: true },
    shippingAddress: {
      street: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      zipCode: { type: String, required: true },
      country: { type: String, required: true },
    },
    orderDate: { type: Date, default: Date.now },
    status: { type: String, required: true },
    paymentMethod: { type: String, required: true },
    paymentStatus: { type: String, required: true },
    notes: { type: String },
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

orderSchema.statics.build = (attrs: IOrder) => {
  return new Order(attrs)
}

const Order = mongoose.model<IOrder, OrderModel>('Order', orderSchema)

export { Order }
