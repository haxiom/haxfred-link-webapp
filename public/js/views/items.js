'use strict';

var events = require('../lib/events');
var $ = require('../lib/dom').select;
var template = require('../templates/link-template.hbs');

var templates = {
  'article': function (model) {
    return '<a class="article" href="'+ model.url +'">' + model.url + '</a>';
  },
   'vimeo': function (model) {
      return '<iframe src="//player.vimeo.com/video/' + model.url + '?title=0&amp;byline=0&amp;portrait=0&amp;badge=0&amp;color=ffffff" width="500" height="281" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>';
   },
   'youtube': function (model) {
      return '<iframe width="560" height="315" src="//www.youtube.com/embed/' + model.url + '" frameborder="0" allowfullscreen></iframe>';
   },
   'image': function (model) {
     return '<img src="' + model.url + '">';
   }
};

function Link (selector, options) {
  options = options || {};

  this.el = $(selector);
  this.class = options.class || 'irc-link';

  this.attachEvents();
}

Link.prototype.attachEvents = function () {
  events.on('data:links', function (data) {
    this.render(data);
  }.bind(this));
};

Link.prototype.render = function (links) {
  var fragment = links.reduce(function (fragment, link) {
    var div = document.createElement('div');
    div.classList.add(this.class);

    if (link.type in templates) {
      div.innerHTML= template({
        content: templates[link.type](link),
        user: link.user,
        caption: link.caption
      });
    }

    fragment.appendChild(div);

    return fragment;
  }.bind(this), document.createDocumentFragment());

  this.el.appendChild(fragment.cloneNode(true));
};

module.exports = Link;
