var Emitter = require('events').EventEmitter;

function Events () {}

Events.prototype = Object.create(Emitter.prototype);

module.exports = new Events();
