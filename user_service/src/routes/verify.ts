import express, { Request, Response } from 'express'
import { BadRequestError } from '@addismen/common'
import { User } from '../models/user'
import jwt, { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken'

const router = express.Router()

router.get('/api/user/verify/:token', async (req: Request, res: Response) => {
  const token = req.params.token

  try {
    // Verify the token using the email verification secret
    const decoded = jwt.verify(
      token,
      process.env.EMAIL_VERIFICATION_SECRET!,
    ) as { userId: string }
    const userId = decoded.userId

    // Find the user with the provided userId
    const user = await User.findById(userId)

    if (!user) {
      throw new BadRequestError('User not found')
    }

    // Mark the user as verified and save changes to the database
    user.isVerified = true
    await user.save()

    res.status(200).json({ message: 'Account verified successfully' })
  } catch (error) {
    if (error instanceof JsonWebTokenError) {
      throw new BadRequestError('Invalid verification token')
    } else if (error instanceof TokenExpiredError) {
      throw new BadRequestError('Expired verification token')
    } else {
      throw new BadRequestError('Invalid or expired verification token')
    }
  }
})

export { router as verifyUserRouter }
