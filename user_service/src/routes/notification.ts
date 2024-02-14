import express from 'express'

const router = express.Router()

router.get('/api/user/notification', (req, res) => {
  res.json('helo')
})

export { router as notificationRouter }
