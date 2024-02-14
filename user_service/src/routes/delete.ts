import express from 'express'

const router = express.Router()

router.get('/api/user/delete', (req, res) => {
  res.json('helo')
})

export { router as deleteRouter }
