import express, { Request, Response } from 'express'
import { body } from 'express-validator'
import { User } from '../models/user'
import { BadRequestError } from '@addismen/common'
import sendVerificationEmail from '../utils/send_verification_email'
import { EmailSendingError } from '@addismen/common'
import { validateRequest } from '@addismen/common'
import { rabbitMQConnection } from '../../rabbitmq-connection'
import { UserCreatedPublisher } from '../events/publisher/user-create-publisher'
const router = express.Router()

router.post(
  '/api/user/register',
  [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password')
      .trim()
      .isLength({ min: 6, max: 20 })
      .withMessage('Password must be between 6 and 20 characters'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email } = req.body
    const existingUser = await User.findOne({ email })

    if (existingUser) {
      throw new BadRequestError('Email in Use')
    }
    const user = User.build({
      ...req.body,
    })
    await user.save()
    const verificationToken = user.getEmailVerificationToken()

    try {
      await sendVerificationEmail(user.email, verificationToken)
    } catch (error) {
      await User.findByIdAndDelete(user._id)
      throw new EmailSendingError(
        'Error while sending verification email, please try again',
      )
    }

    const publisher = new UserCreatedPublisher(rabbitMQConnection.connection)
    await publisher.intializeChannel()

    publisher.publish({
      id: user.id,
    })

    res.status(201).json({
      message:
        'You have successfully registered! A verification email has been sent to your email address. Please check your inbox and spam folder.',
    })
  },
)

export { router as registerRouter }
