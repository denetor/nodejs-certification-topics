# Creation design patterns

## Factory
A function returning a new instance of an object to be created.
```
function catFactory(name) {
  return new Cat(name);
}
const giulio = catFactory('Giulio');
```

Can be used to return specific classes as needed:
```
function animalFactory(type, name) {
  if (type === 'cat') {
    return new Cat(name);
  } else if (type === 'dog') {
    return new Dog(name) {
  } else {
    return new Animal(name);
  }
}
const giulio = animalFactory('cat', 'Giulio');
const charlie = animalFactory('doc', 'Giulio');
```

Can be used to encapsulate some private properties:
```
function catFactory(name) {
  const properties = {};
  const cat = {
    setName(name) {
      properties.name = name;
    }
    getName() {
      return properties.name;
    }
  };
  cat.setName = name;
  return cat;
}
const giulio = catFactory('Giulio');
```


## Builder
Builder is useful to simplify instance creation when has many configuration values. You could pass a configuration object in the constructor:
```
const cat = new Cat({name: 'Giulio', hairLength: 'long', hairColor: 'red', aggressive: true});
```

or you clould use a builder to increase readability:
```
class CatBuilder {
  hasName(name) {
    this.name = name;
    return this;
  }
  hair(length, color) {
    this.hairLength = length;
    this.hairColor = color;
    return this;
  }
  isAggressive(aggressive) {
    this.aggressive = aggressive;
    return this;
  }
  build() {
    return new Cat({name: this.name, hairLength: this.hairLength, hairColor: this.hairColor, aggressive: this.aggressive});
  }
}

const cat = new CatBuilder()
  .hasName('Giulio')
  .hair('long', 'red')
  .isAggressive()
  .build();
```


