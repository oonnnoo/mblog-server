const jwt = require('jsonwebtoken')
const User = require('../models/user')

module.exports = (req, res, next) => {
  let token = req.body.token || req.query.token || req.headers['x-access-token']
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      console.log(decoded)
      console.log(err)
      if (err) {
        res.status(401).json({
          errors: {
            globel: 'Invalid token'
          }
        })
      } else {
        User.findOne({
          email: decoded.email
        }).then(user => {
          req.currentUser = user
          next()
        })
      }
    })
  } else {
    res.status(401).json({
      errors: {
        global: 'No token'
      }
    })
  }
}
