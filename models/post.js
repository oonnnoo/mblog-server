const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/blog')
const db = mongoose.connection

const postSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  author: {
    type: String
  },
  content: {
    type: String,
    required: true
  },
  hidden: {
    type: Boolean
  },
  meta: {
    pv: Number,
    votes: Number
  },
  createAt: {
    type: Date,
    default: Date.now
  },
  updateAt: {
    type: Date
  }
})

const Post = module.exports = mongoose.model('post', postSchema)

module.exports = {
  getPosts: (limit, page, callback) => {
    Post
      .find()
      .skip(page * limit)
      .limit(limit)
      .exec(callback)
  },
  getPostById: (id, callback) => {
    Post
      .findById(id, callback)
  },
  create: (post, callback) => {
    Post
      .create(post, callback)
  },
  update: (id, post, option, callback) => {
    Post
      .findOneAndUpdate(id, post, option, callback)
  },
  delete: (id, callback) => {
    Post
      .remove(id, callback)
  }
}
