'use strict'

var PORT = process.env.EXPRESS_PORT || 1337
var express = require('express')
var app = express()

app.use(express.static('dist'))
app.use(express.static('public'))

app.get('/', function (req, res) {
  res.sendfile('./views/index.html')
})

app.listen(PORT, function () {
  console.log('Listening at', PORT)
})
