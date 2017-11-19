const express = require('express')
const route = require('./router/api/index')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.urlencoded({extended: false}))

app.get('/', function (req, res) {
  console.log(11111)
  res.send('hello')
})

route(app)

app.listen('3000', function () {
  console.log('server is running')
})
