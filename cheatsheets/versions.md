# Node functionalities and versions

## Index

| Feature | Node.js | ESx | Chrome | Firefox |
|---------|--------:|----:|-------:|--------:|
| Array.includes() |  | ES2016 |   |   |
| Arrow functions | 8.0.0 | ES2015 | 58 | 52 |
| Async, await | 7.6.0 | ES2017 | 55 | 52 |
| Binary and Octal Literals |  | ES2015 |   |   |
| Classes | 6.0.0 | ES2015 | 49 | 45 |
| Classes (private, static) | 12.0.0 |  | 74 | 75 |
| Computed Property Names |  | ES2015 |  |  |
| Default parameters | 6.0.0 | ES2015 | 49 | 41 |
| Destructuring | 6.0.0 | ES2015 | 49 | 41 |
| Exponential operator | 7.0.0 | ES2016 | 52 | 52 |
| For ... of | 0.12 | ES2015 | 38 | 13 |
| For await ... of | 10.0.0 |  | 63 | 57 |
| Let, const | 6.0.0 | ES2015 | 21 | 36 |
| Map | 0.12 | ES2015 | 38 | 42 |
| Modules |  | ES2015 |  |  |
| Module.require | 0.1 |  |  |  |
| Object.values(), Object.entries() | 7.0.0 | ES2017 | 54 | 47 |
| Promises | 0.12 | ES2015 | 32 | 29 |
| Promise.any() | 15.0.0 |  | 85 | 79 |
| Shorthand object literals |  | ES2015 |  |  |
| Spread operator | 6.0.0 | ES2015 | 49 | 34 |
| Spread operator in objects | 8.3.0 | ES2018 | 60 | 55 |
| Template strings | 4.0.0 | ES2015 | 41 | 34 |



## Examples


### Array.includes()
ES2016

```js
const array = [1,2,3];
const includesTwo = array.includes(2); // returns true
```


### Arrow Functions
In arrow functions, `this` is the same `this` as in their surrounding code, they don't create a new scope. 
ES2015

```js
myArray.forEach((item) => {
    console.log(item);
});
```


### Async, await
ES2017
Node.js 7.6.0


### Binary and Octal Literals
ES2015

```js
0b111110111 === 503 // true
0o767 === 503 // true
```


### Classes
ES2015

```js
class Car extends Veichle {
    constructor(maxSpeed) {
        super(maxSpeed);
    }
    
    setCurrentSpeed(speed) {
        super.setCurrentSpeed(speed);
    }
    
    static getWheelsNumber() {
        return 4;
    }
}
```


### Computed Property Names
Create property names dynamically on an object
ES2015

```js
var a = {
  ["foo" + ++i]: i,
  ["foo" + ++i]: i
};
console.log(a.foo1); // 1
console.log(a.foo2); // 2
```
See also: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer


### Default parameters
ES2015

```js
function doSomething(a, b = 10) {
    return a + b;
}
console.log(doSomething(5));   // 15
```


### Destructuring
ES2015

With objects, assign object properties to variables with the same name.
```js
var o = {p: 42, q: true};
var {p, q} = o;
console.log(p); // 42
console.log(q); // true
```


### Exponential operator
ES2016

```js
const a = 2**3;
console.log(a); // 8
```


### For ... of
ES2015

```js
for (let i of [1,2,3]) {
    ...
}
```


### For await ... of
Node.js 10.0.0
Chrome 63
Firefox 57

```js
for await (let num of asyncIterable) {
 console.log(num);
}
```


### Let, const
ES2015
Node.js 6.0.0

```js
let a = 0;
const b = 10;
```


### Map
ES2015
Firefox 42
Chrome 38

```js
let m = new Map();
const a = 1;
const b = 'due';
m.set(a, 'Uno');
m.set(b, 'Due');
console.log(m.get(a));  // 'Uno'
console.log(m.get(b));  // 'Due'
console.log(m.size);    // 2
```
See also: https://developer.mozilla.org/it/docs/Web/JavaScript/Reference/Global_Objects/Map


### Modules
Module files to export constants, functions or classes.
ES2015

```js
// some-module.js
export function doSomething() {
    console.log('I do something');
}
```

```js
// index.js
import { doSomething } from './some.module';
doSomething();
```


### Module.require()
Node.js 0.1


### Object.values(), Object.entries()
values() returns an array with the values of an object.
entries() returns an array where every key/value is a nested array
ES2017

```js
const obj = { a: 1, b: 2 };
console.log(Object.values(obj)); // [1, 2]
console.log(Object.entries(obj)); // [['a', 1], ['b', 2]]
```


### Promises
ES2015
Node.js 0.12



### Shorthand object literals
If object properties has the same name as the variables, you can type only the properties.
ES2015
```js
const id = 10;
const name = 'John';
console.log({id, name});    // instead of {id: id, name: name}
```


### Spread operator
Expands a literal in his elements:
ES2015

```js
function sumItems(a, b, c) {
    return a + b + c;
}

const items = [1, 2, 3];
console.log(sumItems(...items));    // 6
```

```js
const items = [1, 2, 3];
const moreItems = [...items, 4, 5]; // [1, 2, 3, 4, 5]
```


### Spread operator in objects
ES2018
Node.js 8.3.0
Chrome 50
Firefox 55

```js
var clonedObj = { ...obj1 };
var mergedObj = { ...obj1, ...obj2 };
var extendedObj = { ...obj1, name: 'John', lastName: 'Doe'};
```


### Template strings
ES2015
```js
const name = 'World';
console.log(`Hello ${name}!`);
```
