import express, { Request, Response } from 'express'

const router = express.Router()

router.get('/api/user/logout', async (req: Request, res: Response) => {
  res.clearCookie('session')
  req.session = null
  res.end()
})
export { router as logoutRouter }
