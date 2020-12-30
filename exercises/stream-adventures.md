# Stream adventures


## 02 - MEET PIPE
You will get a file as the first argument to your program
(process.argv[2]).

Use fs.createReadStream() to pipe the given file to process.stdout.

```js
'use strict';
const fs = module.require('fs');

const sourceFile = fs.createReadStream(process.argv[2]);
sourceFile.pipe(process.stdout);
```


## 03 - INPUT OUTPUT
Take data from process.stdin and pipe it to process.stdout.

```js
'use strict';

process.stdin.pipe(process.stdout);
```


## 04 - READ IT
Implement a Readable stream, initiate a new stream instance from your
implementation and pipe to process.stdout. You will receive the content to
add to your stream as the first argument to your program
(process.argv[2]).

```js
'use strict';
const stream = require('stream');

// create a readstream and send everything to stdout
const myReadStream = new stream.Readable();
myReadStream._read = () => {};
myReadStream.pipe(process.stdout);

// send argument as data
myReadStream.push(process.argv[2]);
```


## 05 - WRITE TO ME
Implement a writable stream that writes in console 'writing: ' + the given
chunk And pipe it to process.stdin

```js
'use strict';

const stream = module.require('stream');
const writeStream = new stream.Writable();
writeStream._write = (chunk, encoding, callback) => {
    console.log('writing: ' + chunk.toString());
    callback(null);
};

process.stdin.pipe(writeStream);
```


## 06 - TRANSFORM
Convert data from process.stdin to upper-case data on process.stdout using
the through2 module.

```js
'use strict';
const through2 = require('through2');

const transformStream = through2(
    function(buffer, encoding, next) {
        this.push(buffer.toString().toUpperCase());
        next();
    },
    function(done) {
        done();
    });

process.stdin
    .pipe(transformStream)
    .pipe(process.stdout);
```


## 07 - LINES
Instead of transforming every line as in the previous "TRANSFORM" example,
for this challenge, convert even-numbered lines to upper-case and
odd-numbered lines to lower-case. Consider the first line to be
odd-numbered.

```js
'use strict';
const through2 = module.require('through2');
const split2 = module.require('split2');
const os = module.require('os');

let odd = true;
const transformStream = through2(
    function(buffer, encoding, next) {
        if (odd) {
            this.push(buffer.toString().toLowerCase() + os.EOL);
        } else {
            this.push(buffer.toString().toUpperCase() + os.EOL);
        }
        odd = !odd;
        next();
    },
    function(done) {
        done();
    });

process.stdin
    .pipe(split2())
    .pipe(transformStream)
    .pipe(process.stdout);
```


## 08 - CONCAT
You will be given text on process.stdin, convert buffer to string and
reverse it using the concat-stream module before writing it to
process.stdout.

```js
'use strict';
const concat = module.require('concat-stream');

const concatStream = concat((body) => {
    const initialText = body.toString();
    const reversedText = initialText.split('').reverse().join('');
    process.stdout.write(reversedText);
});

process.stdin.pipe(concatStream);
```


## 09 - HTTP SERVER
In this challenge, write an http server that uses a through stream
to write back the request stream as upper-cased response data for POST
requests.
Your http server should listen on the port given at process.argv[2] and
convert the POST request written to it to upper-case using the same  
approach as the TRANSFORM example.

```js
'use strict';
const http = module.require('http');
const through2 = module.require('through2');

const port = parseInt(process.argv[2]);
const server = http.createServer((req, res) => {
    if (req.method === 'POST') {
        req
            // transform to uppercase
            .pipe(through2(
                function(buffer, encoding, next) {
                    this.push(buffer.toString().toUpperCase());
                    next();
                },
                function(done) {
                    done();
                }))
            // send output
            .pipe(res);
    } else {
        res.end('Send me a string with POST method');
    }
});
server.listen(port);
```


## 10 - HTTP CLIENT
Send an HTTP POST request to (http://localhost:8099) and pipe
process.stdin into it. Pipe the response stream to process.stdout.

```js
'use strict';
const http = module.require('http');

const httpOptions = {
    method: 'POST',
};
const req = http.request('http://localhost:8099', httpOptions, (res) => {
    res.pipe(process.stdout);
});
process.stdin.pipe(req);
```


## 11 - WEBSOCKETS
In this adventure, write a websocket client that uses the ws module,
generate a stream on top of the websocket client, write the string
"hello\n" to the stream and pipe it to process.stdout.

```js
'use strict';
const WebSocket = module.require('ws');

const ws = new WebSocket('ws://localhost:8099');
const stream = WebSocket.createWebSocketStream(ws);
stream.pipe(process.stdout);
stream.write("hello\n");
```



## 12 - HTML STREAM
Your program will get some html written to stdin. Convert all the inner
html to upper-case for elements with a class name of "loud", and pipe all
the html to stdout.

https://github.com/luong-komorebi/Stream-Adventure-Solutions/blob/master/html-stream.js


## 13 - DUPLEXER
Write a program that exports a function that spawns a process from a cmd
string and an args array and returns a single duplex stream joining
together the stdin and stdout of the spawned process

```js
'use strict';
const { spawn } = module.require('child_process');
var duplexer2 = require('duplexer2');

module.exports = function(cmd, args) {
    // spawn the process and return a single stream
    const spawnedProcess = spawn(cmd, args);
    // joining together the stdin and stdout here
    const duplexStream = duplexer2(spawnedProcess.stdin, spawnedProcess.stdout);

    return duplexStream;
};
```


## 14 - DUPLEXER REDUX
In this example, you will be given a readable stream, counter, as the
first argument to your exported function:
```js
module.exports = function (counter) {  
// return a duplex stream to count countries on the writable side  
// and pass through `counter` on the readable side  
}
```

Return a duplex stream with the counter as the readable side. You will be
written objects with a 2-character country field as input, such as these:
```js
{"short":"OH","name":"Ohio","country":"US"}  
{"name":"West Lothian","country":"GB","region":"Scotland"}  
{"short":"NSW","name":"New South Wales","country":"AU"}
```

Create an object to track the number of occurrences of each unique country
code. For example:
```js
{"US": 2, "GB": 3, "CN": 1}
``` 

Once the input ends, call counter.setCounts() with your counts object.

```js

```
