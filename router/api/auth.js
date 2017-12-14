const express = require('express')
const UserModel = require('../../models/user')
const router = express.Router()

// router.post("/",(req, res) => {
//   res.status(400).json({
//     errors:{
//       global: "Invalid credentials"
//     }
//   })
// })
router.post('/', (req, res) => {
  const { credentials } = req.body
  UserModel
    .findOne({
      email: credentials.email
    })
    .then(user => {
      if (user && user.isValidPassword(credentials.password)) {
        console.log(user)
        res.json({user: user.toAuthJSON()})
      } else {
        res.status(400).json({
          errors: {
            global: 'Invalid credentials'
          }
        })
      }
    })
})
module.exports = router
