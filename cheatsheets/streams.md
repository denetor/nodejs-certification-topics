# Streams
Simplest use of streams is serving a file without keeping busy the server:
```js
const http = require('http');
const fs = require('fs');
const server = http.createServer((req, res) => {
  const stream = fs.createReadStream(__dirname + '/data.txt');
  stream.pipe(res);
  // manage error events
  stream.on('error', function(err){
    res.statusCode = 500;
    res.end('Internal Server Error');
  });
})
server.listen(3000)
```

### pipe()
Pipes allow to send the output of a stream in another stream.
```js
src.pipe(dest1).pipe(dest2)
// or, equivalent
src.pipe(dest1)
dest1.pipe(dest2)
```

### Native nodejs API support
Some nodejs APIs support streams:
- process.stdin
- process.stdout
- process.stderr
- fs.createReadStream()
- fs.createWriteStream()
- net.connect()
- http.request()
- zlib.createGzip()/zlib.createGunzip()
- zlib.createDeflate()(zlib.createInflate())

### Stream types

#### Readable streams
Readable streams must implement `readable._read()` function.
You may push data that will be sent as output. Push null data to tell the stream ended:
```js
const Stream = require('stream');
const readableStream = new Stream.Readable();

readableStream._read = () => {};
readableStream.push('hi!');
readableStream.push('ho!');
readableStream.push(null);
readableStream.pipe(process.stdout);
```

You can consume directly a readable stream using the `readable` event:
```js
readableStream.on('readable', () => {
  console.log(readableStream.read());
});
```

#### Writable streams
Must implement 'writable._write()' function.
```js
const Stream = require('stream')
const writableStream = new Stream.Writable()

writableStream._write = (chunk, encoding, next) => {
    console.log(chunk.toString());
    next();
}
```

You can read from a readable stream using a writable stream:
```js
const Stream = require('stream');

const readableStream = new Stream.Readable({
    read() {}
})
writableStream._write = (chunk, encoding, next) => {
    console.log(chunk.toString());
    next();
}
readableStream.pipe(writableStream);
readableStream.push('hi!');
readableStream.push('ho!');
```

You can write directly on a writable stream using `write()`:
```js
writableStream.write('hey!');
```

To tell a writable stream you ended writing, use `end()` method:
```js
writableStream.end();
```

#### Transform streams
Must implement `._transform(chunk, enc, next)` function. A transform stream
takes a stream as input and returns another stream as output, making a transformation
on streamed data.
```js
var readStream = new stream.Readable();
readStream._read = function() {};
readStream.push('Hello!');

// create transform stream
var transformStream = new stream.Transform();
transformStream._transform = function(chunk, encoding, next) {
    // chunk is a Buffer. Transform into string, uppercase it
    // and send output to this transform stream
    this.push(chunk.toString().toUpperCase());
    next();
}
readStream.pipe(transformStream).pipe(process.stdout);
```

#### Duplex streams
Duplex streams are readable/writable and both ends of the stream engage in a
two-way interaction, sending back and forth messages like a telephone. An
rpc exchange is a good example of a duplex stream.
```js
a.pipe(b).pipe(a)
```

#### Classic (old) streams
You may encounter old style streams. You can recognize them by the `data` event:
```js
stream.emit('data', 'A');

process.stdin.on('data', function (buf) {
    console.log(buf);
});
```
Node automatically swithches to the old streams when sees `data` in use.
Some info here: https://github.com/dmitriz/stream-handbook#classic-streams

### Streams resources:
- https://nodejs.dev/learn/nodejs-streams
- https://github.com/dmitriz/stream-handbook
- https://nodejs.org/api/stream.html

