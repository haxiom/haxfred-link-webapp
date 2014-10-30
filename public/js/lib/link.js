var ENDPOINT = 'http://localhost:3000/api/links'
var template = require('../templates/link-template.hbs')
var xhr = require('superagent');

var templates = {
  'article': function (model) {
    return '<a class="article" href="'+ model.url +'">' + model.url + '</a>';
  },
//   'vimeo': function (model) {
//
//   },
//   'youtube': function (model) {
//
//   },
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
      this.render(response.body);
    }.bind(this));
}

module.exports = Link;
