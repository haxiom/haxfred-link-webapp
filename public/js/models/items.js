var xhr = require('superagent');
var events = require('../lib/events');

function Items (options) {
  this.endpoint = options.endpoint;
  this.inProgress = false;
  this.requests = [];
}

Items.prototype.get = function (options) {
  this.requests.push(
    this.generateRequest(options)
  );

  this.checkQueue();
};

Items.prototype.checkQueue = function () {
  if (this.requests.length && this.inProgress === false) {
    this.inProgress = true;
    this.requests[0].end(this.completeRequest.bind(this));
  }
};

Items.prototype.completeRequest = function (err, response) {
  if (err) {
    console.log(err);
    return;
  }

  this.inProgress = false;
  this.requests.shift();
  this.checkQueue();

  events.emit('data:links', response.body);
};

Items.prototype.generateRequest = function (options) {
  options = options || {};

  return xhr.get(this.endpoint)
    .query({
      _offset: options.offset || 0,
      _limit: options.limit || 3,
      _order: 'postDate DESC'
    });
};

module.exports = Items;
