'use strict';

var events = require('../lib/events');

function List () {
  this.attachEvents();
  this.handleScroll();
}

List.prototype.attachEvents = function () {
  window.addEventListener('scroll', this.handleScroll.bind(this));
  events.on('data:links', this.handleScroll.bind(this));
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
