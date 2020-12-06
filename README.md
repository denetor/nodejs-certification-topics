# Nodejs certification topics exercises and cheatsheets

## Intro
Topics are listed at this site:
https://www.nodecertification.com/

### Node.js Application Developer Certification (JSNAD)
- [x] [Module system](#modules)
- [x] [Events](#Events)
- [x] [Buffers](#Buffers)
- [x] [Streams](#Streams)
- [x] [Control flow](#control-flow)
- [x] [Child processes](#child-processes)
- [x] [Debugging and profiling](#debugging-and-profiling)
- [x] [Error handling](#error-handling)
- [ ] CLI
- [ ] File system
- [ ] Javascript prerequisites
- [ ] Process/Operating system
- [ ] Package.json
- [ ] Unit testing
- [ ] Cluster module (no part of JSNAD)

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
- [ ] https://www.vskills.in/practice/index.php?route=test/search&search=node

### Other learning resources
- https://nodejs.dev/learn


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
- https://nodejs.org/api/events.html


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



/pagebreak
# Child processes

In Node it's possible to run external OS commands or programs and treat them as `EventEmitter`s.
The module involved is `child_process` and the methods used are `spawn()`, `fork()`, `exec()`, 
and `execFile()`.
Child processes can be piped with other child processes and with streams like `stdout`, `stdin` or `stderr`.
They expose too these streams.

## exec()
Exec creates a shell to run the process, so it's slightly less efficient than `spawn`.
The result is buffered and fully returned via callback when completely available, so avoid having
gigantic results.

As `exec` sends the code to a shell, avoid evil code to be injected if uses user input.

```js
const { exec } = require('child_process');

exec('find . -type f | wc -l', (err, stdout, stderr) => {
  if (err) {
    console.error(`exec error: ${err}`);
    return;
  }
  console.log(`Number of files ${stdout}`);
});
```

## spawn()
Spawn does not create a shell to run commands and streams both input and result, so
it's more efficient than `exec()`.

```js
const { spawn } = require('child_process');

// spawn 2 commands, with parameters in the array
const find = spawn('find', ['.', '-type', 'f']);
const wc = spawn('wc', ['-l']);

// pipes output of a command in the input of the other
find.stdout.pipe(wc.stdin);

// read the output of the last command
wc.stdout.on('data', (data) => {
  console.log(`Number of files ${data}`);
});
```

### spawn options
You can set an option to use shell syntax when invoking `spawn`:
```js
const child = spawn('find . -type f | wc -l', {
  stdio: 'inherit',     // inherits stdin, stdout, stderr from the main process
  shell: true,          // use shell syntax
  cwd: '/home/nicola',  // change work directory where the command is lauched
  env: { PORT: 3001 }   // set environment variables. Parent process' env variables are not inherited
});
```

### spawn detached option
Using the `detached` option, the child process becomes independent and has his own process id without parents.
The `unref()' method allows the child process not to end if the parent process exits before him. 
```js
const { spawn } = require('child_process');
const child = spawn('node', ['timer.js'], {
  detached: true,
  stdio: 'ignore'
});
child.unref();
```

## execFile()
Just launches executables, without shell. It's used exactly like `exec`.
Notice: on Windows, `.bat` and `.cmd` files need a shell, so you cannot use `execFile` on them.

## spawnSync(), execSync(), execFileSync()
Those are the synchronous versions of the previous commands.
They are useful when writing simple synchronous code.

## fork()
It's a variation of `spawn` to start node processes.

There is a communication channel between parent and child processes:
```js
// computation.js
const longComputation = () => {
    let sum = 0;
    for (let i = 0; i < 1e9; i++) {
        sum += i;
    };
    return sum;
};
process.on('message', (msg) => {
    const sum = longComputation();
    process.send(sum);
});

// parent.js
const http = require('http');
const { fork } = require('child_process');
const server = http.createServer();
server.on('request', (req, res) => {
    if (req.url === '/compute') {
        const compute = fork('compute.js');
        compute.send('start');
        compute.on('message', sum => {
            res.end(`Sum is ${sum}`);
        });
    } else {
        res.end('Ok')
    }
});
server.listen(3000);
```
In this example when parent process receives a `/compute` request, starts a child process with `fork()`
and sends him `start` message to begin a heavy calculation.
The listens the `message` event to receive the result.

### Child process resources
- https://www.freecodecamp.org/news/node-js-child-processes-everything-you-need-to-know-e69498fe970a/
- https://nodejs.org/api/child_process.html


/pagebreak
# Debugging and profiling

## Profiling
Profiling example:
Prepare a profile-login.json file containing the data that will be posted:
```json
{"email":"johndoe@example.com","password":"password"}
```
Then run the server with `--prof` option to enable profiling:
```
$ node --prof main.js
```
Now use `ab` utility to send multiple requests:
```
$ ab -k -c 20 -n 250  -H  "accept: */*" -p profile-login.json -T "application/json" http://localhost:3000/auth/login

This is ApacheBench, Version 2.3 <$Revision: 1807734 $>
Copyright 1996 Adam Twiss, Zeus Technology Ltd, http://www.zeustech.net/
Licensed to The Apache Software Foundation, http://www.apache.org/

Benchmarking localhost (be patient)
Completed 100 requests
Completed 200 requests
Finished 250 requests


Server Software:        
Server Hostname:        localhost
Server Port:            3000

Document Path:          /auth/login
Document Length:        158 bytes

Concurrency Level:      20
Time taken for tests:   1.719 seconds
Complete requests:      250
Failed requests:        0
Keep-Alive requests:    250
Total transferred:      102000 bytes
Total body sent:        56750
HTML transferred:       39500 bytes
Requests per second:    145.47 [#/sec] (mean)
Time per request:       137.490 [ms] (mean)
Time per request:       6.874 [ms] (mean, across all concurrent requests)
Transfer rate:          57.96 [Kbytes/sec] received
                        32.25 kb/s sent
                        90.21 kb/s total

Connection Times (ms)
              min  mean[+/-sd] median   max
Connect:        0    0   0.1      0       0
Processing:    82  135  26.2    131     211
Waiting:       82  135  26.2    131     211
Total:         82  135  26.2    131     211

Percentage of the requests served within a certain time (ms)
  50%    131
  66%    145
  75%    152
  80%    157
  90%    171
  95%    183
  98%    202
  99%    205
 100%    211 (longest request) 
```
As output there will be also file called `isolate-xxxxxxxxxxxx-v8.log`
It can be conferted in readable form with:
```
$ node --prof-process isolate-0x3ec63c0-8805-v8.log > processed.txt
```
Some parts of its content:
```
 [Shared libraries]:
   ticks  total  nonlib   name
   1410   62.5%          /usr/local/bin/node
    110    4.9%          /lib/x86_64-linux-gnu/libc-2.27.so
      3    0.1%          /usr/lib/x86_64-linux-gnu/libstdc++.so.6.0.25
      1    0.0%          [vdso]

 [JavaScript]:
   ticks  total  nonlib   name
      8    0.4%    1.1%  LazyCompile: *resolve path.js:973:10
      3    0.1%    0.4%  LazyCompile: *self /home/nicola/nodeprojects/smartrms/node_modules/cli-color/bare.js:71:16
      3    0.1%    0.4%  LazyCompile: *<anonymous> /home/nicola/nodeprojects/smartrms/node_modules/typeorm/query-builder/transformer/RawSqlResultsToEntityTransformer.js:110:43
      2    0.1%    0.3%  LazyCompile: *printMessage /home/nicola/nodeprojects/smartrms/node_modules/@nestjs/common/services/logger.service.js:77:24
      2    0.1%    0.3%  LazyCompile: *normalizeString path.js:52:25
      2    0.1%    0.3%  LazyCompile: *debug /home/nicola/nodeprojects/smartrms/node_modules/@nestjs/common/services/logger.service.js:55:17

 [C++]:
   ticks  total  nonlib   name
    105    4.7%   14.3%  node::contextify::ContextifyContext::CompileFunction(v8::FunctionCallbackInfo<v8::Value> const&)
     51    2.3%    7.0%  epoll_pwait
     35    1.6%    4.8%  node::native_module::NativeModuleEnv::CompileFunction(v8::FunctionCallbackInfo<v8::Value> const&)
     33    1.5%    4.5%  void node::StreamBase::JSMethod<&(int node::StreamBase::WriteString<(node::encoding)1>(v8::FunctionCallbackInfo<v8::Value> const&))>(v8::FunctionCallbackInfo<v8::Value> const&)
     
 [Summary]:
   ticks  total  nonlib   name
     29    1.3%    4.0%  JavaScript
    700   31.0%   95.6%  C++
    113    5.0%   15.4%  GC
   1524   67.6%          Shared libraries
      3    0.1%          Unaccounted

 [C++ entry points]:
   ticks    cpp   total   name
    359   30.7%   15.9%  v8::internal::Builtin_DatePrototypeToLocaleString(int, unsigned long*, v8::internal::Isolate*)
    292   25.0%   12.9%  v8::internal::Builtin_HandleApiCall(int, unsigned long*, v8::internal::Isolate*)
    267   22.8%   11.8%  node::task_queue::RunMicrotasks(v8::FunctionCallbackInfo<v8::Value> const&)
     22    1.9%    1.0%  fwrite
     21    1.8%    0.9%  write
```
Further down the file there is the full tree of calls, where we can search for expensive calls found in the first part.

### Debugging and profiling resources
- https://nodejs.org/en/docs/guides/simple-profiling



/pagebreak
#Error handling

## Error object
Error object has 2 properties:
- message: string
- stack: array

## In plain javascript
```js
try {
    // some commands
} catch(e) {
    console.error(e);   // executed only in case of errors
} finally {
    console.log('this code is always executed, errors or not');
}
```

## Callbacks
```js
doSomething(parameter, function(err, result) {
    if (!err) {
        console.log(result);
    } else {
        console.error(err);
    }
});
```

## Promises
```js
myPromise.then(result => {
    // do something with result
})
.then(secondResult => {
    // after using result, do something with secondResult
})
.catch(firstErr => {
    // catch result in one of the previous '.then's.
    // if error happened in first '.then', the second one is skipped
})
.then(thirdResult => {
    // this is executed after secondResult or after firstErr
})
.catch(anotherErr => {
    // this is executed in case of errors with thirdResult
});
```

## async/await
```js
async function doSomethingAsync() {
    try {
        const something = await fetchSomething();
        // continue elaborations
    } catch(e) {
        console.error('Error happened in async function');
    }
}
```
