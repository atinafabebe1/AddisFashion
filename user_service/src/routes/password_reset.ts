import express from 'express'

const router = express.Router()

router.get('/api/user/password_reset', (req, res) => {
  res.json('helo')
})

export { router as passwordResetRouter }
