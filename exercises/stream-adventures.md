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
