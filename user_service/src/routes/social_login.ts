import express from 'express'

const router = express.Router()

router.get('/api/user/social_login', (req, res) => {
  res.json('helo')
})

export { router as socialLoginRouter }
