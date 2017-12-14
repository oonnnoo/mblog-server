const express = require('express')
const router = express.Router()

router.use('/api/auth', require('./auth'))
router.use('/api/posts', require('./posts'))
router.use('/api/post', require('./post'))

router.use('/api', (req, res, next) => {
  res.status(200).json({
    message: 'It works!'
  })
})

module.exports = (app) => {
  app.use(router)
}
