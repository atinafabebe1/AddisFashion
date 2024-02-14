import mongoose, { Document, Schema, Model } from 'mongoose'

interface ISubCategory extends Document {
  name: string
}

const subcategorySchema = new Schema<ISubCategory>({
  name: { type: String, required: true },
})

interface ICategory extends Document {
  name: string
  subcategories?: ISubCategory[] | undefined
}

interface ICategoryModel extends Model<ICategory> {
  build(attrs: ICategory): Promise<ICategory>
}

const categorySchema = new Schema<ICategory>(
  {
    name: { type: String, required: true, unique: true },
    subcategories: { type: [subcategorySchema], default: [] },
  },
  { timestamps: true },
)

categorySchema.statics.build = async (attrs: ICategory): Promise<ICategory> => {
  return Category.create(attrs)
}

const Category = mongoose.model<ICategory, ICategoryModel>(
  'Category',
  categorySchema,
)

export { Category, ICategory, ISubCategory }
