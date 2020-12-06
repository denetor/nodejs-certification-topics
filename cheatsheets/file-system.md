# File system
It's operated using module `fs`.

## Paths notice
All `fs` methods use, as file path, the current working directory (where the node command has been launched), not the
path containing the `fs` call.
If you need the path of the file containing the call to a `fs` method, you can use `__dirname`.

Also use `path` module to create cross-platform valid paths.

## Synchronous methods
In almost every case you should use `fs` with asynchronous calls. The exception is when you have to read
configuration files needed before continuing the program.

## Promise-based methods
Methods in `fs` module are available in promises form starting from node v11.
```js
const fs = require("fs").promises;
const writePromise = fs.writeFile("./out.txt", "Hello, World");
writePromise
  .then(() => console.log("success!"))
  .catch(err => console.error(err));
```

## Callback example
```js
const fs = require('fs');
fs.unlink('/tmp/hello', (err) => {
  if (err) throw err;
  console.log('successfully deleted /tmp/hello');
});
```



### File system resources
- https://heynode.com/tutorial/what-fs-file-system-module
- https://nodejs.org/api/fs.html
