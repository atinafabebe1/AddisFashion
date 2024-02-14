import express, { Request, Response } from 'express'
import { body } from 'express-validator'
import { User } from '../models/user'
import { BadRequestError } from '@addismen/common'
import { validateRequest } from '@addismen/common'
import jwt from 'jsonwebtoken'

const router = express.Router()

router.post(
  '/api/user/login',
  [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password')
      .trim()
      .notEmpty()
      .withMessage('You must supply a passowrd'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    console.log(req.body)
    const { email, password } = req.body
    const exisitnguser = await User.findOne({ email })

    if (!exisitnguser || !(await exisitnguser.matchPassword(password))) {
      throw new BadRequestError('Invalid Credentail')
    }

    if (!exisitnguser.isVerified) {
      throw new BadRequestError('Please verify your email first')
    }

    const userJWT = jwt.sign(
      {
        id: exisitnguser.id,
        email: exisitnguser.email,
      },
      process.env.JWT_SECRET!,
    )

    req.session = {
      jwt: userJWT,
    }

    res.status(200).send(exisitnguser)
  },
)
export { router as loginRouter }
