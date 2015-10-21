const through = require('through2')
const bole = require('bole')
const json = require('JSONStream')
const pump = require('pump')

module.exports = boleStream

// Stream data into a bole logger
// obj -> null
function boleStream (opts) {
  opts = opts || {}
  opts.name = opts.name || 'bole'
  opts.level = opts.level || 'info'
  const logger = bole(opts.name)

  const ts = json.parse()
  const ws = through({ objectMode: true }, function (chunk, enc, cb) {
    logger[opts.level](chunk)
    cb()
  })

  return pump(ts, ws)
}
