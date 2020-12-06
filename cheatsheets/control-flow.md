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

