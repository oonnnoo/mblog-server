const express = require('express')
const router = express.Router()

router.use('/api/posts', require('./posts'))
router.use('/api/post', require('./post'))

module.exports = (app) => {
  app.use(router)
}
