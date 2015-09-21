# bole-stream
[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][codecov-image]][codecov-url]
[![Downloads][downloads-image]][downloads-url]
[![js-standard-style][standard-image]][standard-url]

Stream data into a [bole](https://github.com/rvagg/bole) logger. Allows fine
grained control over what is logged from a stream. Works exceptionally well in
conjunction with [http-ndjson](https://github.com/yoshuawuyts/http-ndjson).

## Installation
```sh
$ npm install bole-stream
```

## Usage
```js
const boleStream = require('bole-stream')
const httpNdjson = require('http-ndjson')
const bole = require('bole')
const http = require('http')

bole.output({ level: 'info', stream: process.stdout })

http.createServer((req, res) => {
  httpNdjson(req, res).pipe(boleStream({ level: 'info' }))
  res.end()
}).listen()
```

## API
### writeStream = boleStream(opts)
Create a new Bole writestream (instanceof `through2`). `opts` can contain the
following values:
- __name__: the default log name
- __level__: the log level. Can be one of `debug`, `info`, `warn` and `error`

## See Also
- [http-ndjson](https://github.com/yoshuawuyts/http-ndjson)
- [bole](https://github.com/rvagg/bole)

## License
[MIT](https://tldrlegal.com/license/mit-license)

[npm-image]: https://img.shields.io/npm/v/bole-stream.svg?style=flat-square
[npm-url]: https://npmjs.org/package/bole-stream
[travis-image]: https://img.shields.io/travis/yoshuawuyts/bole-stream/master.svg?style=flat-square
[travis-url]: https://travis-ci.org/yoshuawuyts/bole-stream
[codecov-image]: https://img.shields.io/codecov/c/github/yoshuawuyts/bole-stream/master.svg?style=flat-square
[codecov-url]: https://codecov.io/github/yoshuawuyts/bole-stream
[downloads-image]: http://img.shields.io/npm/dm/bole-stream.svg?style=flat-square
[downloads-url]: https://npmjs.org/package/bole-stream
[standard-image]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square
[standard-url]: https://github.com/feross/standard
