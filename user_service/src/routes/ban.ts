import express from 'express'

const router = express.Router()

router.get('/api/user/ban', (req, res) => {
  console.log(req.currentUser)
  res.json('helo')
})

export { router as banRouter }
