const express = require('express')
const router = express.Router()
const PostModel = require('../../models/post')

// 获取所有文章
// /posts?xxx
router.get('/', function (req, res) {
  // 每页的条数
  let limit = req.query.limit - 0 || 10
  // 第几页
  let page = req.query.page - 1 || 0
  let rescontent = {}
  PostModel.getPosts(limit, page, (err, posts) => {
    if (err) {
      console.log(err)
    }
    rescontent.posts = posts
    rescontent.page = page + 1
    rescontent.limit = limit
    res.send(rescontent)
  })
})

module.exports = router
