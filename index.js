const stream = require('readable-stream')
const assert = require('assert')
const bole = require('bole')
const util = require('util')

module.exports = BoleStream

// create a new bole stream
// obj -> wstream
function BoleStream (opts) {
  if (!(this instanceof BoleStream)) return new BoleStream(opts)

  opts = opts || {}
  assert.equal(typeof opts, 'object', 'is object')

  // initialize default Writable properties
  stream.Writable.call(this, opts)

  // initialize custom properties
  this.destroyed = false
  this.level = opts.level || 'info'
  this.log = bole(opts.name || 'bole')
}

// inherit Writable methods
util.inherits(BoleStream, stream.Writable)

// object mode shorthand
// obj -> wstream
BoleStream.prototype.obj = function (opts) {
  opts = opts || {}
  assert.equal(typeof opts, 'object', 'is object')
  opts.objectMode = true
  return new BoleStream(opts)
}

// process new data
// (any, str, fn) -> wstream
BoleStream.prototype._write = function (chunk, enc, cb) {
  if (this._writableState.objectMode) {
    this.log[this.level](chunk)
    return cb()
  }

  try {
    const obj = JSON.parse(String(chunk))
    this.log[this.level](obj)
    cb()
  } catch (e) {
    cb(e)
  }
}
