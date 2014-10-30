var PORT = process.env.EXPRESS_PORT || 1337;
var express = require('express');
var hbs = require('hbs').__express;
var static = require('serve-static');
var router = express.Router;
var app = express();

app.set('view engine', 'html');
app.engine('html', hbs);

app.use(static('dist'));
app.use(static('public'));

app.get('*', function (req, res) {
  res.render('index');
});

app.listen(PORT, function () {
  console.log('Listening at', PORT);
});
