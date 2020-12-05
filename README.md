# Nodejs certification topics exercises and cheatsheets

## Intro
Topics are listed at this site:
https://www.nodecertification.com/

### Node.js Application Developer Certification (JSNAD)
- [x] [Buffers](#Buffers)
- [x] [Streams](#Streams)
- [x] [Control flow](#control-flow)
- [ ] Child processes
- [ ] Debugging
- [ ] Error handling
- [ ] CLI
- [x] [Events](#Events)
- [ ] File system
- [ ] Javascript prerequisites
- [x] [Module system](#modules)
- [ ] Process/Operating system
- [ ] Package.json
- [ ] Unt testing

### Node.js Services Developer Certification (JSNSD)
- [ ] Servers and services
- [ ] Security

### Node.js exercises
- [ ] https://github.com/workshopper/stream-adventure
- [ ] https://github.com/bulkan/async-you
- [ ] https://github.com/stevekane/promise-it-wont-hurt
- [ ] https://github.com/workshopper/learnyounode
- [ ] https://github.com/othiym23/bug-clinic
- [ ] https://github.com/workshopper/scope-chains-closures
- [ ] https://github.com/workshopper/how-to-npm

### Other learning resources
- https://nodejs.dev/learn

\pagebreak
# Buffers
Buffers are subclass of `Uint8Array` and are a fixed length bytes sequence.
Every buffer element is an integer between 0 and 255.

### Creating a buffer
```js
const zeroFilled = Buffer.alloc(10);
const oneFilled = Buffer.alloc(10, 1);
const uninitialized = Buffer.allocUnsafe(10); // may contain sensible previous data, but is quicker
const threeBytes = Buffer.from([1, 2, 3]);
const threeAsciiValues = Buffer.from(['ABC']);
const truncated = Buffer.from([-10, 5, 4.5, '1']);
```

### Creating a buffer with encoding
Converting strings, you can specify encoding
```js
const buf = Buffer.from('hello world', 'utf8');

console.log(buf.toString('hex'));
// Prints: 68656c6c6f20776f726c64
console.log(buf.toString('base64'));
// Prints: aGVsbG8gd29ybGQ=
console.log(Buffer.from('fhqwhgads', 'utf8'));
// Prints: <Buffer 66 68 71 77 68 67 61 64 73>
console.log(Buffer.from('fhqwhgads', 'utf16le'));
// Prints: <Buffer 66 00 68 00 71 00 77 00 68 00 67 00 61 00 64 00 73 00>
```

### Accessing buffer data
Yu may access buffers as arrays, and even iterate them:
```js
const buf = Buffer.from('Hey!');
console.log(buf[0]);            // 72
console.log(buf.toString());    // 'Hey!'
console.log(buf.length);        // 4

for (const item of buf) {
    console.log(item);          //72 101 121 33
}
```

### Writing buffers
A buffer can be written (not appended) with write() and their values can
be written as array elements::
```js
const buf = Buffer.alloc(4);
buf.write('Hey!');
buf[1] = 111;                   // 'o'
console.log(buf.toString());    // 'Hoy!'
```

You may copy buffers:
```js
const buf = Buffer.from('Hey!');
let bufcopy = Buffer.alloc(4) // allocate 4 bytes
buf.copy(bufcopy);
```

### Slicing buffer
You can slice a buffer to create a partial view of a buffer:
```js
const buf = Buffer.from("Hey!");
const slice = buf.slice(0, 2);
console.log(buf.toString());        // 'Hey!'
console.log(slice.toString());      // 'He'
// changing the slice will change the origin al buffer too
slice[1] = 111;                     // 'o'
console.log(buf.toString());        // 'Hoy!'
```

### Buffer resources:
- https://nodejs.dev/learn/nodejs-buffers
- https://nodejs.org/api/buffer.html

\pagebreak
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

\pagebreak
# Control flow

## Callbacks
With callbacks you can create series and parallel flows:

### series
```js
// Async task (same in all examples in this chapter)
function async(arg, callback) {
  console.log('do something with \''+arg+'\', return 1 sec later');
  setTimeout(function() { callback(arg * 2); }, 1000);
}
// Final task (same in all the examples)
function final() { console.log('Done', results); }

// A simple async series:
var items = [ 1, 2, 3, 4, 5, 6 ];
var results = [];
function series(item) {
  if(item) {
    async( item, function(result) {
      results.push(result);
      return series(items.shift());
    });
  } else {
    return final();
  }
}
series(items.shift());
```

### Full parallel
```js
function async(arg, callback) {
  console.log('do something with \''+arg+'\', return 1 sec later');
  setTimeout(function() { callback(arg * 2); }, 1000);
}
function final() { console.log('Done', results); }

var items = [ 1, 2, 3, 4, 5, 6 ];
var results = [];

items.forEach(function(item) {
  async(item, function(result){
    results.push(result);
    if(results.length == items.length) {
      final();
    }
  })
});
```

### Parallel limit
```js
function async(arg, callback) {
  console.log('do something with \''+arg+'\', return 1 sec later');
  setTimeout(function() { callback(arg * 2); }, 1000);
}
function final() { console.log('Done', results); }

var items = [ 1, 2, 3, 4, 5, 6 ];
var results = [];
var running = 0;
var limit = 2;

function launcher() {
  while(running < limit && items.length > 0) {
    var item = items.shift();
    async(item, function(result) {
      results.push(result);
      running--;
      if(items.length > 0) {
        launcher();
      } else if(running == 0) {
        final();
      }
    });
    running++;
  }
}
launcher();
```

## Promises
_(all Nodejs versions)_

Promises allow more readable code than using callbacks:
```js
// Using Promises
fetch("url")
  .then(() => fetch("url"))
  .then(() => fetch("url"))
  .then(() => fetch("url"))
  .then(() => fetch("url"))
  .then(() => console.log("all done"))
  .catch(err => console.log(err));

// Using callbacks.
fetchCallback("url", err => {
  if (err) return console.log(err);
  fetchCallback("url", err => {
    if (err) return console.log(err);
    fetchCallback("url", err => {
      if (err) return console.log(err);
      fetchCallback("url", err => {
        if (err) return console.log(err);
        console.log("all done");
      });
    });
  });
});
```

Promise has 3 possible states:
- pending: initial state, neither fulfilled nor rejected.
- fulfilled: the operation completed successfully.
- rejected: the operation failed.

Promises expose `then` and `catch` methods.

### Creating promises
```js
const myPromise = new Promise((resolve, reject) => {
  doSomething(function(err, data) {
      if (!err) {
          resolve(data);
      } else {
          reject(err);
      }
    });
});
```

### Chaining promises 
```js
fetch("http://jsonplaceholder.typicode.com/users/1")
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(err => console.log(err));
```

## Async/await

_(node 7.6.0+)

`async` and `await` gives the asynchronous software a synchronous appearance.
Async functions will implicitly return a Promise.

```js
const fetch = require('node-fetch')

async function run() {
    // Will wait for promise to resolve before logging to console.
    const status = await fetch('https://jsonplaceholder.typicode.com/comments/1')
        .then(res => res.status);
    console.log(status + ' - Complete!');
}
run();
```

### Async error handling
Similarly to synchronous code, with async/await, errors are handled by wrapping
`await` calls in a `try...catch` block, instead of using `.catch`

```js
// Wrap await calls in try...catch to catch any errors.
async function handleAsync() {
	try {
		const data = await fetch('url').then(res => res.json());
		console.log(data);
	} catch(error) {
		// If the fetch call has any errors, or if the Promise it
		// returns is rejected, an error is thrown and we can process it
		// here.
		console.log('Uh oh!', error);
	}
}
handleAsync()
```

Because an async function returns a Promise implicitly, we can also attach a
`catch` handler to the `async` function call:
```js
async function catchAsync() {
	const data = await fetch('url').then(res => res.json());
	console.log(data);
}
catchAsync.catch(error => console.log('Uh oh!', error));
```


### Control flow resources
- http://book.mixu.net/node/ch7.html
- https://heynode.com/tutorial/what-are-promises
- https://heynode.com/tutorial/use-asyncawait-promises


\pagebreak
# Events
Promises and many other features are made with event management.
Events are used trough EventEmitter class.

## Creating, listening and emitting
```js
// creating an EventEmitter
const myEmitter = new EventEmitter();

// registering three callbacks. 
myEmitter.on('eventOne', callback1);
myEmitter.on('eventOne', callback2);
myEmitter.addListener('eventOne', callback3);   // on and addListener are synonyms

// emitting the event
myEmitter.emit('eventOne'); // all the three callbacks will be called
```

## Once listener
Registers for an event that may be emitted only once. Internally, when the event is
listened for the first time, all its listeners will be removed.
```js
const myEmitter = new EventEmitter();
myEmitter.once('myEvent', myCallback);

myEmitter.emit('myEvent');  // lauches callback
myEmitter.emit('myEvent');  // does not launch any callback again
```

## Callback parameters
We can add parameters to callbacks
```js
myEmitter.on('status', (code, msg)=> console.log(`Got ${code} and ${msg}`));
myEmitter.emit('status', 200, 'ok');    // Got 200 and ok
```

## Unregistering events
You can remove listeners with `off` (or with `removeListener`):
```js
myEmitter.off('eventOne');
myEmitter.removeListener('eventOne', myCallback);
```

## Getting listeners
If you need the list of listeners linked to an event:
```js
const myEmitter = new EventEmitter();
myEmitter.on('eventOne', myCallback);

console.log(myEmitter.listenerCount());         // 1
console.log(myEmitter.listeners('eventOne'));   // array of listeners
console.log(myEmitter.rawListeners('eventOne'));   // array of listeners, including wrappers linke .once()
```

### Events resources
- https://www.freecodecamp.org/news/how-to-code-your-own-event-emitter-in-node-js-a-step-by-step-guide-e13b7e7908e1/
- https://nodejs.org/dist/latest-v14.x/docs/api/events.html

\pagebreak
# Modules
`require` and `module` are the two modules available in global scope used to manage modules.
In each module, `exports` is a special object (empty by deafault) returned by the `require` function.

```js
const config = require('/path/to/file');
```

### Resolving
Required file is resolved searching, in order, files with the following extensions: js, json, node.
The latter is a c++ file, compiled with node-gyp.

A list of the paths where a required file is searched, is given by `module.paths`:
```
$ node
> module.paths
[
  '/home/nicola/nodeprojects/node-certification/repl/node_modules',
  '/home/nicola/nodeprojects/node-certification/node_modules',
  '/home/nicola/nodeprojects/node_modules',
  '/home/nicola/node_modules',
  '/home/node_modules',
  '/node_modules',
  '/home/nicola/.node_modules',
  '/home/nicola/.node_libraries',
  '/usr/local/lib/node'
]
```

You may **require a folder**: node will search for an index.js in it to import.

`require.resolve('file')` only returns the resolved file path or throws an error when no file is found on paths.

### Loading
`require()` loads end evaluates files in synchronous mode. Loading a file, its code is executed.
A loaded module contains a stucture like this:
```
{
  id: '.',
  exports: {},
  parent: null,
  filename: '/Users/samer/learn-node/index.js',
  loaded: false,
  children: [],
  paths: [ ... ]
}
```

#### Modules dependency
When referencing a module from another module, since node executes the code sequentially,
the lines following requiring module2 are executed after module2 has been required and executed.
For ths reason module2 does not know the existance of module1.b and moduls2.c
```
// module1.js
exports.a = 1;
require('module2');
exports.b = 2;
exports.c = 3;

// module2.js
const Module1 = require('./module1');
console.log('Module1 is partially loaded here', Module1)

// output:
Module1 is partially loaded here { a: 1 }
```

Note: `module.exports` cannot be changed at runtime, once it's set it's set.

### Requiring JSON files
Node recognizes JSON required files. As example, this config.json:
```json
{
  "host": "localhost",
  "port": 8080
}
```

Can be imported this way:
```js
const { host, port } = require('./config');
console.log(`Server will run at http://${host}:${port}`);
```

### Modules resources:
- https://www.freecodecamp.org/news/requiring-modules-in-node-js-everything-you-need-to-know-e7fbd119be8/


