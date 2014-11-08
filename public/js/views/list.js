'use strict';

var events = require('../lib/events');
var throttle = require('lodash.throttle');

function List () {
  this.attachEvents();
  this.handleScroll();
}

List.prototype.attachEvents = function () {
  var handler = throttle(this.handleScroll.bind(this), 300);
  window.addEventListener('scroll', handler);
  events.on('data:links', handler);
};

List.prototype.calculateDocumentHeight = function () {
  return {
    scroll: window.scrollY + window.innerHeight,
    height: document.body.offsetHeight
  };
};

List.prototype.handleScroll = function () {
  var doc = this.calculateDocumentHeight();
  var offset = Math.floor(doc.height * 0.2);

  if (doc.scroll + offset >= doc.height) {
    events.emit('requestLinks');
  }
};

module.exports = List;
