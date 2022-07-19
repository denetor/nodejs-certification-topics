# Node Modules

## Exports

### Named exports
```mymodule.js
module.exports.sum(a, b) {
  return a+b;
}
```

```app.js
const myModule = require('mymodule');
console.log(myModule.sum(1, 2));
```

### Exporting a function
Useful when you want to focus on the module's main task and other 'variants' are normally not needed.


```sum.js
module.exports = (a, b) => {
  return a+b;
}

module.exports.abs = (a, b) => {
  return Math.abs(a) + Math.abs(b);
}
```

```app.js
const sum = require('sum');
console.log(sum(1, -2));
console.log(sum.abs(1, -2));
```

### Esporting a class
```mymodule.js
class MyModule {
  constructor(argument) {
    ...
  }
  sum(a, b) {
    return a+b;
  }
}
module.exports = MyModule;
```

```app.js
const MyModule = require('mymodule');
const myModule = new MyModule(argument);
console.log(myModule.sum(1, 2));
```

### Esporting an instance
Less used. Does not guarantee that required module is the same for every part of sources (it's not a singleton).

```mymodule.js
class MyModule {
  constructor(argument) {
    ...
  }
  sum(a, b) {
    return a+b;
  }
}
module.exports = new MyModule(defaultArgument);
```

```app.js
const myModule = require('mymodule');
console.log(myModule.sum(1, 2));

const myDifferentModule = new myModule.constructor(argument);
console.log(myDifferentModule.sum(2, 1));
```
