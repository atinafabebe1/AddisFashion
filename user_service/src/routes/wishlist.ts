import express from 'express'

const router = express.Router()

router.get('/api/user/wishlist', (req, res) => {
  res.json('helo')
})

export { router as wishlistRouter }
