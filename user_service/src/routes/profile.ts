import express from 'express'

const router = express.Router()

router.get('/api/user/profile', (req, res) => {
  res.json('profile')
})

export { router as profileRouter }
