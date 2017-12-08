const express = require('express')
const route = require('./router/api/index')
const bodyParser = require('body-parser')

const port = process.env.PORT || 3000;

const app = express()

app.use(bodyParser.urlencoded({extended: false}))

app.get('/', function (req, res) {
  res.send('hello')
})

route(app)

// hendle 404 error
app.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404
  next(error)
})

// handle 500 error
app.use((error, req, res, next) => {
  res.status(error.status || 500)
  res.json({
    error: {
      message: error.message
    }
  })
})

app.listen(port, function () {
  console.log('server is running')
})
