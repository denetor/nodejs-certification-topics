# Callbacks and events

## Callback pattern

### Continuation-Passing Style (CPD)
Way to propagate the result of a function calling another one. Like this:
```
function sumCpd(a, b, callback) {
  callback(a+b);
}
```

### Callback conventions
- callback is the last parameter
- error is the first of callback parameters
- error must be of Error type
```
function sum(a, b, callback) {
  ...
}
sum(1, 2, function(err, result) {
  if (err) {
    ...
  } else {
    console.log(result);
  }
}
```

### Returning static value from a callback
If a value is immediately available to be returned in a callback, we should wrap in `process.nextTick()` or in `process.setImmediate()`.
This ensures the rest of the function is executed before calling the callback.

`process.nextTick()` is faster than `process.setImmediate()`, but since it's executed before every I/O, it cound generate I/O starvation.
`setImmediate()` never leads to starvation.

```
readCached(file, callback) {
  if (cachedData) {
    process.nextTick(() => {
      callback(null, cachedData);
    });
  } else {
    // read from file
    ...
  }
}
```


### Propagating errors in callbacks
```
import { readFile } from 'fs';
function readJson(filename, callback) {
  readFile(filename, 'utf8', function(err, data) {
    let parsed;
    if (err) {
      // propagate errors using callback
      callback(err);
    }
    try {
      // this may generate exception
      parsed = JSON.parse(data);
    } catch (e) {
      // if not caught this way, exception will hang the program
      return callback(e);
    }
    callback(null, parsed);
  }
}
```

### Avoiding uncaught exceptions to run the program on uncertain state
Use UncaughtException event of process object to terminate the application.
```
process.on('UncaughtException', function(err) {
  console.error('Uncaught exception: ' + err.message);
  process.exit(1);
});
```

## Observer pattern
Callback pattern allows to link only one listener to each event. Observer pattern let events being listened to many listeners.
It's obtained extending EventEmitter class.

### Using pure EventEmitter
For learning purposes, one could use EventEmitter:
```
import {EventEmitter} from 'events';
import {readFile} from 'fs';
function findRegex(files, regex) {
  const emitter = new EventEmitter();
  for (const file of files) {
    readFile(file, 'utf8', (err, data) => {
      if (err) {
        // emit an event and exit
        return emitter.emit('error', err);
      }
      // emitting an event and continuing elaboration
      emitter.emit('fileRead', file);
      const match = data.match(regex);
      if (match) {
        match.forEach(elem => emitter.emit('matchFound', file, elem));
      }
    });
  }
  // to chain calls
  return emitter;
}

findRegex(['a.txt', 'b.txt'], /hello \w+/g)
  .on('fileRead', file => console.log('read file: ' + file))
  .on('matchFound', (file, elem) => console.log('found "' + elem + '" in file ' + file))
  .on('error', err => console.error(err.message));
```

### Extending EventEmitter
This is the right way to use EventEmitter.
```
import {EventEmitter} from 'events';
import {readFile} from 'fs';

class FindRegex extends EventEmitter {

  constructor(regex) {
    super();
    this.regex = '';
    this.files = [];
  }
  
  addFile(file) {
    this.files.push(file);
    return this; // to chain commands
  }
  
  find() {
    for (const file of files) {
      readFile(file, 'utf8', (err, data) => {
        if (err) {
          return this.emit('error', err);
        }
        this.emit('fileRead', file);
        const match = data.match(this.regex);
        if (match) {
          match.forEach(elem => this.emit('matchFound', file, elem));
        }
      });
    }
    return this;
  }
}

const findRegexInstance = new FindRegex(/hello \w+/g)
  .addFile('a.txt')
  .addFile('b.txt')
  .find()
  .on('matchFound', (file, elem) => console.log('found "' + elem + '" in file ' + file))
  .on('error', err => console.error(err.message));
```

### EventEmitter and memory leaks
Remember to call `emitter.removeListener('event', listener)` when a listener is no more needed or the memory will be kept in use causing a memory leak.
