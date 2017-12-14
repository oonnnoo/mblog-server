const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

// TODO email唯一性验证
const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    lowercase: true,
    index: true
  },
  passwordHash: {
    type: String,
    required: true
  }
}, {
  timestamps: true
})

userSchema.methods.isValidPassword = function isValidPassword (password) {
  console.log(password)
  return bcrypt.compareSync(password, this.passwordHash)
}
userSchema.methods.generateJWT = function generateJWT () {
  return jwt.sign({
    email: this.email
  }, process.env.JWT_SECRET)
}
userSchema.methods.toAuthJSON = function toAuthJSON () {
  return {
    user: this.email,
    token: this.generateJWT()
  }
}

module.exports = mongoose.model('User', userSchema)
