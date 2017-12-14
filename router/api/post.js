const express = require('express')
const router = express.Router()
const PostModel = require('../../models/post')
const authenticate = require('../../middlewares/authenticate')

// 获取 /post/:postid
router.get('/:_id', function (req, res) {
  let id = req.params._id
  PostModel.getPostById(id, (err, post) => {
    if (err) {
      res.status(404).send('Sorry, we cannot find that!')
    } else {
      res.send(post)
    }
  })
})

router.use(authenticate)
// 新增 /post
router.post('/', function (req, res) {
  let post = req.body
  console.log(post)
  PostModel.create(post, (err, post) => {
    if (err) {
      console.log(err)
    }
    res.json(post)
  })
})

// 删除 /post/:postid
router.delete('/:_id', function (req, res) {
  let id = req.params._id
  PostModel.delete(id, (err, post) => {
    if (err) {
      console.log(err)
    }
    res.send(post)
  })
})

// 修改 /post/:postid
router.put('/:_id', function (req, res) {
  let id = req.params._id
  let post = req.body
  PostModel.update(id, post, {}, (err, post) => {
    if (err) {
      console.log(err)
    }
    res.send(post)
  })
  res.send('hello put')
})

module.exports = router
