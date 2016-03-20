'use strict'

var express = require('express')
var fs = require('fs')
var app = express()

const PORT = process.env.EXPRESS_PORT || 1337
const USER_IMAGES_PATH_BASE = `${__dirname}/public/images/users`
const DEFAULT_USER_IMAGE = `${USER_IMAGES_PATH_BASE}/default.jpg`

app.use(express.static('dist'))
app.use(express.static('public'))

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/views/index.html')
})

app.get('/users/images/:name', function (req, res) {
  let name = req.params.name
  let imagePath = `${USER_IMAGES_PATH_BASE}/${name}.jpg`

  try {
    fs.statSync(imagePath)
  } catch (e) {
    imagePath = DEFAULT_USER_IMAGE
  }

  res.sendFile(imagePath)
})

app.listen(PORT, function () {
  console.log('Listening at', PORT)
})
