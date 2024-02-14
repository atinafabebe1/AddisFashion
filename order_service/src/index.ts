import mongoose from 'mongoose'
import express from 'express'
import 'express-async-errors'

import cors, { CorsOptions } from 'cors'
import cookieSession from 'cookie-session'

import { NotfoundError, currentUser, errorHandler } from '@addismen/common'

import { rabbitMQConnection } from '../rabbitmq-connection'
import { placeOrderRouter } from './routes/place-order'

const app = express()

app.set('trust proxy', true)

app.use(
  cors({
    origin: '*',
  }),
)

app.use(express.json())

app.use(
  cookieSession({
    name: 'session',
    signed: false,
    secure: true,
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
  }),
)

app.use(currentUser)

app.use(placeOrderRouter)

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

  app.listen(3000, () => {
    console.log('listening on port 3000')
  })
}

start()
