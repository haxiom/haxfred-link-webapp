'use strict';

var slice = Array.prototype.slice;

function select (selector) {
  return document.querySelector(selector);
}

function selectAll (selector) {
  return slice.call(document.querySelectorAll(selector));
}

module.exports = {
  select: select,
  selectAll: selectAll
};
