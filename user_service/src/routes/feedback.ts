import express from 'express'

const router = express.Router()

router.get('/api/user/feedback', (req, res) => {
  res.json('helo')
})

export { router as feedbackRouter }
