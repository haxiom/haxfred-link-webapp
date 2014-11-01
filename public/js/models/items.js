var xhr = require('superagent');
var events = require('../lib/events');

function Items (options) {
  this.endpoint = options.endpoint;
}

Items.prototype.get = function (options) {
  options = options || {};

  xhr.get(this.endpoint)
    .query({
      _offset: options.offset || 0,
      _limit: options.limit || 3,
      _order: 'createdAt DESC'
    })
    .end(function (err, response) {
      if (err) {
        console.log(err);
        return;
      }

      events.emit('data:links', response.body);
    }.bind(this));
};

module.exports = Items;
