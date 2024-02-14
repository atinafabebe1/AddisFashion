import { Request, Response, NextFunction } from 'express'

import jwt from 'jsonwebtoken'

interface userPayload {
  id: string
  email: string
}

declare global {
  namespace Express {
    interface Request {
      currentUser?: userPayload
    }
  }
}

export const currentUser = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.log('accessed')
  if (!req.session?.jwt) {
    console.log('no session')
    return next()
  }
  console.log(process.env.JWT_SECRET!)

  try {
    const payload = jwt.verify(
      req.session.jwt,
      process.env.JWT_SECRET!,
     ) as userPayload
    console.log(payload)
    req.currentUser = payload

    console.log('req.currentUser')
    console.log(req.currentUser)
  } catch (error) {}
  next()
}
