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
- [ ] Module system
- [ ] Process/Operating system
- [ ] Package.json
- [ ] Unt testing

### Node.js Services Developer Certification (JSNSD)
- [ ] Servers and services
- [ ] Security

## Buffers

## Streams


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

### Resources:
- https://www.freecodecamp.org/news/requiring-modules-in-node-js-everything-you-need-to-know-e7fbd119be8/

