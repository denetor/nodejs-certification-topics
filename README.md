# Nodejs certification topics exercises and cheatsheets

## Intro
Topics are listed at this site:
https://www.nodecertification.com/

### Node.js Application Developer Certification (JSNAD)
- [x] Buffers
- [x] Streams
- [ ] Control flow
- [ ] Child processes
- [ ] Debugging
- [ ] Error handling
- [ ] CLI
- [ ] Events
- [ ] File system
- [ ] Javascript prerequisites
- [x] Module system
- [ ] Process/Operating system
- [ ] Package.json
- [ ] Unt testing

### Node.js Services Developer Certification (JSNSD)
- [ ] Servers and services
- [ ] Security

---
## Buffers
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
https://nodejs.dev/learn/nodejs-buffers
https://nodejs.org/dist/latest-v12.x/docs/api/buffer.html


---
## Streams


---
## Modules
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

