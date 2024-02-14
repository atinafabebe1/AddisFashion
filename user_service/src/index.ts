import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import 'express-async-errors'
import mongoose from 'mongoose'
import cors from 'cors'
import cookieSession from 'cookie-session'
import { banRouter } from './routes/ban'
import { deleteRouter } from './routes/delete'
import { feedbackRouter } from './routes/feedback'
import { notificationRouter } from './routes/notification'
import { passwordResetRouter } from './routes/password_reset'
import { profileRouter } from './routes/profile'
import { registerRouter } from './routes/register'
import { reviewRouter } from './routes/review'
import { socialLoginRouter } from './routes/social_login'
import { wishlistRouter } from './routes/wishlist'
import { verifyUserRouter } from './routes/verify'
import { loginRouter } from './routes/login'
import { NotfoundError, errorHandler } from '@addismen/common'
import { currentUserRouter } from './routes/current_user'
import { logoutRouter } from './routes/logout'
const app = express()

// app.set('trust proxy', 1)

app.use(
  cors({
    origin: ['http://localhost:5173', 'http://localhost:3001'],
    credentials: true,
  }),
)

app.use(express.json())

app.use(
  cookieSession({
    name: 'session',
    signed: false,
    secure: false,
    sameSite: 'none',
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
  }),
)

app.use(registerRouter)
app.use(banRouter)
app.use(deleteRouter)
app.use(feedbackRouter)
app.use(notificationRouter)
app.use(passwordResetRouter)
app.use(profileRouter)
app.use(reviewRouter)
app.use(logoutRouter)
app.use(loginRouter)
app.use(socialLoginRouter)
app.use(wishlistRouter)
app.use(verifyUserRouter)
app.use(currentUserRouter)

app.all('*', async () => {
  throw new NotfoundError()
})

app.use(errorHandler)

const start = async () => {
  function checkEnvVariable(variableName: string): void {
    if (!process.env[variableName]) {
      throw new Error(`${variableName} not found in environment variables`)
    }
  }

  const requiredEnvVariables = [
    'MONGODB_URI',
    'PORT',
    'JWT_SECRET',
    'REFERESH_JWT_SECRET',
    'EMAIL_VERIFICATION_SECRET',
    'JWT_EXPIRE',
    'REFRESH_JWT_EXPIRE',
    'JWT_COOKIE_EXPIRE',
    'EMAIL_TOKEN_EXPIRE',
    'SMTP_HOST',
    'SMTP_PORT',
    'EMAIL_FROM',
    'FROM_NAME',
    'EMAIL_PASSWORD',
    'BASE_URL',
    'ClOUDINARY_CLOUD_NAME',
    'ClOUDINARY_API_KEY',
    'ClOUDINARY_API_SECRET',
  ]

  requiredEnvVariables.forEach(checkEnvVariable)

  try {
    await mongoose.connect(
      'mongodb+srv://atinafabebe1:ati123@userservice.wgfw0e9.mongodb.net/?retryWrites=true&w=majority',
    )
    console.log('Connected to mongodb')
  } catch (error) {
    console.error(error)
  }

  app.listen(3100, () => {
    console.log('listening on port 3000 user service')
  })
}

start()
