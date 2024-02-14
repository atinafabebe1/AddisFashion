import express from 'express'
import { currentUser } from '@addismen/common'
import { Request } from 'express'

const router = express.Router()

router.get('/api/user/current_user', currentUser, (req: Request, res) => {
  res.send({ currentUser: req.currentUser || null })
})

export { router as currentUserRouter }
