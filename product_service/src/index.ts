import dotenv from 'dotenv'
dotenv.config()

import mongoose from 'mongoose'
import express from 'express'
import 'express-async-errors'

import cors, { CorsOptions } from 'cors'
import cookieSession from 'cookie-session'
import { currentUser } from '@addismen/common'
import { NotfoundError, errorHandler } from '@addismen/common'

import { createProductRouter } from './routes/create_product'
import { getProductRouter } from './routes/get_product'
import { createCategoryRouter } from './routes/create_catergory'
import { getCategoryRouter } from './routes/get_categories'
import { updateProductRouter } from './routes/update_product'
import { updateCategoryRouter } from './routes/update_category'
import { removeProductRouter } from './routes/remove_product'
import { removeCategoryRouter } from './routes/remove_category'
import { rabbitMQConnection } from '../rabbitmq-connection'
import bodyParser from 'body-parser'
import path from 'path'
const app = express()

app.set('trust proxy', true)

app.use(
  cors({
    origin: ['http://localhost:5173', 'http://localhost:3000'],
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
    maxAge: 24 * 60 * 60 * 1000,
  }),
)

app.use(currentUser)
app.use('/uploads', express.static(path.join(__dirname, '../uploads')))

app.use(createProductRouter)
app.use(updateProductRouter)
app.use(getProductRouter)
app.use(removeProductRouter)

app.use(createCategoryRouter)
app.use(getCategoryRouter)
app.use(updateCategoryRouter)
app.use(removeCategoryRouter)

app.all('*', async () => {
  throw new NotfoundError()
})

app.use(errorHandler)

const start = async () => {
  // function checkEnvVariable(variableName: string): void {
  //   if (!process.env[variableName]) {
  //     throw new Error(`${variableName} not found in environment variables`)
  //   }
  // }

  // const requiredEnvVariables = [
  //   'MONGODB_URI',
  //   'PORT',
  //   'JWT_SECRET',
  //   'REFERESH_JWT_SECRET',
  //   'EMAIL_VERIFICATION_SECRET',
  //   'JWT_EXPIRE',
  //   'REFRESH_JWT_EXPIRE',
  //   'JWT_COOKIE_EXPIRE',
  //   'EMAIL_TOKEN_EXPIRE',
  //   'SMTP_HOST',
  //   'SMTP_PORT',
  //   'EMAIL_FROM',
  //   'FROM_NAME',
  //   'EMAIL_PASSWORD',
  //   'BASE_URL',
  //   'ClOUDINARY_CLOUD_NAME',
  //   'ClOUDINARY_API_KEY',
  //   'ClOUDINARY_API_SECRET',
  // ]

  // requiredEnvVariables.forEach(checkEnvVariable)

  try {
    await mongoose.connect(
      'mongodb+srv://atinafabebe1:ati123@userservice.wgfw0e9.mongodb.net/?retryWrites=true&w=majority',
    )
    await rabbitMQConnection.connect(
      'amqps://xpzbwnft:GAMdewowG9Q6ZbKJeQedVEzydXv4u4mR@armadillo.rmq.cloudamqp.com/xpzbwnft',
    )

    console.log('Connected to mongodb')
  } catch (error) {
    console.error(error)
  }

  app.listen(3101, () => {
    console.log('listening on port 3101')
  })
}

start()
