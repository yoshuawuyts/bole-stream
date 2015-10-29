const stream = require('readable-stream')
const ndjson = require('ndjson')
const bole = require('bole')
const test = require('tape')

const boleStream = require('./')

test('accept a stream and log data', function (t) {
  t.plan(4)

  const rs = ndjson.serialize()
  const ws = boleStream()
  rs.pipe(ws)

  bole.output({ level: 'info', stream: testSink() })
  rs.end({ foo: 'bar' })

  function testSink () {
    return new stream.Writable({
      write: function (data) {
        const obj = JSON.parse(String(data))
        t.equal(typeof obj, 'object', 'type')
        t.equal(obj.level, 'info', 'level')
        t.equal(obj.name, 'bole', 'name')
        t.equal(obj.foo, 'bar', 'property')
      }
    })
  }
})

test('allow config', function (t) {
  t.plan(4)

  const rs = ndjson.serialize()
  const ws = boleStream({ name: 'aaah', level: 'error' })
  rs.pipe(ws)

  bole.output({ level: 'info', stream: testSink() })
  rs.end({ foo: 'bar' })

  function testSink () {
    return new stream.Writable({
      write: function (data) {
        const obj = JSON.parse(String(data))
        t.equal(typeof obj, 'object')
        t.equal(obj.level, 'error')
        t.equal(obj.name, 'aaah')
        t.equal(obj.foo, 'bar')
      }
    })
  }
})
