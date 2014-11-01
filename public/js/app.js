'use strict';

var Model = require('./models/items');
var LinksView = require('./views/items');
var ListView  = require('./views/list');
var events = require('./lib/events');
var offset = 0;

function getLinks (offset) {
  model.get({
    offset: offset
  });
}

events.on('requestLinks', function () {
  offset = offset + 3;
  getLinks(offset);
});

var model = new Model({endpoint: 'http://localhost:3000/api/links'});
new LinksView('#log');
new ListView();

getLinks(0);
