const jwt = require('jsonwebtoken')
const User = require('../models/user')

module.exports = (req, res, next) => {
  const header = req.headers.authorization
  let token
  if (header) {
    token = header.split(' ')[1]
  }
  if (token) {
    jwt.verif(token, process.env.JWT_SECRET, (err, decode) => {
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
