'use strict';

var Model = require('./models/items');
var LinksView = require('./views/items');
var ListView  = require('./views/list');
var events = require('./lib/events');
var linkOffset = 0;
var step = 3;

function getLinks (offset) {
  model.get({
    offset: offset
  });
}

events.on('requestLinks', function () {
  getLinks(linkOffset);
  linkOffset = linkOffset + step;
});

var model = new Model({endpoint: 'http://localhost:3000/api/links'});
new LinksView('#log');
new ListView();
