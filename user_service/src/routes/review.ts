import express from 'express'

const router = express.Router()

router.get('/api/user/review', (req, res) => {
  res.json('helo')
})

export { router as reviewRouter }
