'use strict'

var express = require('express')
var fs = require('fs')
var path = require('path')
var app = express()

var PORT = process.env.EXPRESS_PORT || 1337
var USER_IMAGES_PATH_BASE = __dirname + '/public/images/users'
var DEFAULT_USER_IMAGE = USER_IMAGES_PATH_BASE + '/default.jpg'

app.use(express.static('dist'))
app.use(express.static('public'))

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '/views/index.html'))
})

app.get('/users/images/:name', function (req, res) {
  var name = req.params.name
  var imagePath = USER_IMAGES_PATH_BASE + '/' + name + '.jpg'

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
