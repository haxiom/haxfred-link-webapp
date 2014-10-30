var ENDPOINT = 'http://localhost:3000/api/links'
var template = require('../templates/link-template.hbs')
var xhr = require('superagent');

var templates = {
  'article': function (model) {
    return '<a class="article" href="'+ model.url +'">' + model.url + '</a>';
  },
   'vimeo': function (model) {
      var vimeoID = model.url.replace(/http(s)?:\/\/(www.)?vimeo.com\//g, "");
      return '<iframe src="//player.vimeo.com/video/' + vimeoID + '?title=0&amp;byline=0&amp;portrait=0&amp;badge=0&amp;color=ffffff" width="500" height="281" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>'
   },
   'youtube': function (model) {
      var youtubeID = model.url.replace(/http(s)?:\/\/(www.)?youtu(.)?be(.com)?\/(watch\?v=)?/g, "");
      return '<iframe width="560" height="315" src="//www.youtube.com/embed/' + youtubeID + '" frameborder="0" allowfullscreen></iframe>';
   },
   'image': function (model) {
     return '<img src="' + model.url + '">';
   }
}

function Link (selector) {
  this.el = document.querySelector(selector);
};

Link.prototype.render = function (links) {
  var content = links.reduce(function (text, link) {
    if (link.type in templates) {
      var rendered = template({
        content: templates[link.type](link),
        user: link.user,
        caption: link.caption
      });
    }

    return text + rendered;
  }, '');

  this.el.innerHTML = content;
};

Link.prototype.get = function () {
  xhr.get(ENDPOINT)
    .query({
      _limit: 10,
      _order: 'createdAt DESC'
    })
    .end(function (err, response) {
      console.log(response.body);
      this.render(response.body);
    }.bind(this));
}

module.exports = Link;
