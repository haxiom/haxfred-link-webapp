'use strict';

var events = require('../lib/events');
var $ = require('../lib/dom').select;
var template = require('../templates/link-template.hbs');

var templates = {
  'article': function (model) {
    return '<a class="article" href="'+ model.url +'">' + model.url + '</a>';
  },
   'vimeo': function (model) {
      var vimeoID = model.url.replace(/http(s)?:\/\/(www.)?vimeo.com\//g, '');
      return '<iframe src="//player.vimeo.com/video/' + vimeoID + '?title=0&amp;byline=0&amp;portrait=0&amp;badge=0&amp;color=ffffff" width="500" height="281" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>';
   },
   'youtube': function (model) {
      var youtubeID = model.url.replace(/http(s)?:\/\/(www.)?youtu(.)?be(.com)?\/(watch\?v=)?/g, '');
      return '<iframe width="560" height="315" src="//www.youtube.com/embed/' + youtubeID + '" frameborder="0" allowfullscreen></iframe>';
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
        caption: link.caption,
        date: Link.prototype.parseDate(link.postDate),
        time: Link.prototype.parseTime(link.postDate)
      });
    }

    fragment.appendChild(div);

    return fragment;
  }.bind(this), document.createDocumentFragment());

  this.el.appendChild(fragment.cloneNode(true));
};

Link.prototype.parseDate = function(utc) {
  var date = new Date(utc);
  return (date.getMonth() + 1) + '/' + date.getDate() + '/' +  date.getFullYear();
};

Link.prototype.parseTime = function(utc) {
  var date = new Date(utc),
      hours = date.getHours(),
      minutes = date.getMinutes(),
      period = 'am';

  if (hours > 12) {
    hours = hours - 12;
    period = 'pm';
  } else if (hours == 0) {
    hours = 12;
  }

  if (minutes < 10) {
    minutes = "0" + minutes;
  }

  return hours + ':' + minutes + period;
}

module.exports = Link;
