
/*jshint -W058 */

var pipe, EventEmitter, assert;

try {
  // node
  pipe = require('..');
  assert = require('better-assert');
  EventEmitter = require('events').EventEmitter;
} catch (e) {
  // component
  pipe = require('eventemitter-pipe');
  assert = require('assert');
  EventEmitter = require('emitter');
}


describe('eventemitter-pipe', function () {

  it('should be a function', function () {
    assert(typeof pipe === 'function');
  });

  it('should be aliased as "pipe.pipe"', function () {
    assert(pipe === pipe.pipe);
  });

  describe('.pipe()', function () {
    it('should throw when not provided 2 EventEmitters', function (done) {
      try {
        pipe(new EventEmitter, {});
      } catch (err) {
        try {
          pipe({}, new EventEmitter);
        } catch (err) {
          done();
        }
      }
    });

    it('should pipe events from a to b', function (done) {
      var a = new EventEmitter;
      var b = new EventEmitter;

      pipe(a, b);

      b.on('hello', function (world) {
        assert(world === 'world');
        done();
      });

      a.emit('hello', 'world');
    });
  });

  describe('.unpipe()', function () {

    it('should throw when provided an un-piped EventEmitter', function (done) {
      try {
        pipe.unpipe({});
      } catch (err) {
        assert(err.message === 'Un-piped EventEmitter provided');
        done();
      }
    });

    it('should unpipe events from an EventEmitter', function (done) {
      var a = new EventEmitter;
      var b = new EventEmitter;

      pipe(a, b);

      b.once('hello', function () {
        pipe.unpipe(a);

        b.on('hello', function () {
          throw new Error('should not inherit events from a');
        });

        a.emit('hello');

        setTimeout(done, 10);
      });

      a.emit('hello');
    });
  });
});
