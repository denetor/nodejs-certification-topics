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

