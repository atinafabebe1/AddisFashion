import mongoose, { Document, Schema } from 'mongoose'
import bcrypt from 'bcryptjs'
import crypto from 'crypto'
import jwt from 'jsonwebtoken'

interface IUser extends Document {
  email: string
  password: string
  firstName?: string
  lastName?: string
  profilePicture?: string
  role: 'user' | 'seller' | 'admin'
  socialProvider?: string
  socialId?: string
  isVerified: boolean
  verificationToken?: string
  createdAt: Date
  updatedAt: Date
  matchPassword(candidatePassword: string): Promise<boolean>
  getEmailVerificationToken(): string
  resetPasswordToken?: string
  resetPasswordExpire?: Date
}

interface UserModel extends mongoose.Model<IUser> {
  build(attrs: IUser): IUser
}

// Define the schema for User
const userSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      trim: true,
    },
    lastName: {
      type: String,
      trim: true,
    },
    profilePicture: {
      type: String,
      default: 'default.jpg',
    },
    role: {
      type: String,
      enum: ['user', 'seller', 'admin'],
      default: 'user',
    },
    socialProvider: {
      type: String,
    },
    socialId: {
      type: String,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id
        delete ret._id
        delete ret.password
        delete ret.__v
      },
    },
  },
)

// Define pre-save middleware to hash the password before saving
userSchema.pre<IUser>('save', async function (next) {
  if (!this.isModified('password')) return next()

  try {
    const saltRounds = 10
    const hashedPassword = await bcrypt.hash(this.password, saltRounds)
    this.password = hashedPassword
    next()
  } catch (error) {
    next(error as Error)
  }
})

userSchema.methods.getEmailVerificationToken = function (): string {
  const res = jwt.sign(
    { userId: this._id },
    process.env.EMAIL_VERIFICATION_SECRET!,
    {
      expiresIn: process.env.EMAIL_TOKEN_EXPIRE,
    },
  )
  return res
}

// Sign JWT and return
userSchema.methods.getSignedJwtRefreshToken = function (): string {
  if (!process.env.REFRESH_JWT_SECRET) {
    throw new Error('Refresh JWT secret is not defined.')
  }

  return jwt.sign(
    { userName: this.userName, id: this._id },
    process.env.REFRESH_JWT_SECRET,
    {
      expiresIn: process.env.REFRESH_JWT_EXPIRE,
    },
  )
}

//Match use entered password to hashed password in the database
userSchema.methods.matchPassword = async function (candidatePassword: string) {
  return await bcrypt.compare(candidatePassword, this.password)
}

//Generate and hash password token
userSchema.methods.getResetPasswordToken = function () {
  const resetToken = crypto.randomBytes(20).toString('hex')
  //Hash token and set to resetPasswordToken field
  this.resetPasswordToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex')
  //Set expire
  this.resetPassowrdExpire = Date.now() + 10 * 60 * 1000
  return resetToken
}
// Create the User model
userSchema.statics.build = (attrs: IUser) => {
  return new User(attrs)
}
const User = mongoose.model<IUser, UserModel>('User', userSchema)

export { User }
