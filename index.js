
var EventEmitter;

try {
  // node
  EventEmitter = require('events').EventEmitter;
} catch (e) {
  // component
  EventEmitter = require('emitter');
}

/**
 * Pipe events from `a` to `b`
 *
 * @api public
 * @param {EventEmitter} a
 * @param {EventEmitter} b
 */

function pipe(a, b) {
  if (!(a instanceof EventEmitter) || !(b instanceof EventEmitter)) {
    throw new TypeError('non-EventEmitter provided');
  }

  var emit = a._emit = a.emit;

  a.emit = function () {
    emit.apply(a, arguments);
    b.emit.apply(b, arguments);
    return a;
  };
}

/**
 * Unpipe a previously piped `EventEmitter`
 *
 * @api public
 * @param {EventEmitter} emitter
 */

function unpipe(emitter) {
  if (!emitter._emit) {
    throw new Error('Un-piped EventEmitter provided');
  }

  emitter.emit = emitter._emit;
}

/**
 * Expose pipe
 */

exports = module.exports = pipe;
exports.pipe = pipe;


/**
 * Expose `unpipe`
 */

exports.unpipe = unpipe;
