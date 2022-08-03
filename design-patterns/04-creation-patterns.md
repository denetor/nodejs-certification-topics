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

## Revealing constructor
