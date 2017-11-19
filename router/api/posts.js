const express = require('express')
const router = express.Router()
const PostModel = require('../../models/post')

// 获取所有文章
// /posts?xxx
router.get('/', function (req, res) {
  let limit = req.query.limit - 0 || 10
  let page = req.query.page - 1 || 0
  console.log(limit)
  console.log(page)
  PostModel.getPosts(limit, page, (err, posts) => {
    if (err) {
      console.log(err)
    }
    console.log(posts)
    res.send(posts)
  })
})

module.exports = router
