const ndjson = require('ndjson')
const bole = require('bole')
const test = require('tape')
const bl = require('bl')

const boleStream = require('./')

test('accept a stream and log data', function (t) {
  t.plan(3)

  const buf = bl()
  buf.on('data', function (data) {
    const obj = JSON.parse(String(data))
    t.equal(typeof obj, 'object')
    t.equal(obj.level, 'info')
    t.equal(obj.name, 'bar')
  })

  bole.output({
    level: 'info',
    stream: ndjson.parse().pipe(buf)
  })

  const ws = boleStream()
  ws.write({ name: 'bar' })
})

test('allow config', function (t) {
  t.plan(4)

  const buf = bl()
  buf.on('data', function (data) {
    const obj = JSON.parse(String(data))
    t.equal(typeof obj, 'object')
    t.equal(obj.level, 'error')
    t.equal(obj.name, 'aaah')
    t.equal(obj.foo, 'bar')
  })

  bole.output({
    level: 'info',
    stream: ndjson.parse().pipe(buf)
  })

  const ws = boleStream({ name: 'aaah', level: 'error' })
  ws.write({ foo: 'bar' })
})
