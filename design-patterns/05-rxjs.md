# Rxjs

## Observable
it's a serie/collection of values emitted asyncroneously.

To see it's values we need to Subscribe them:

### Creating ands subscribing Observables
The Observable constructor takes one argument: the subscribe function.

```
import "./styles.css";
import { Observable } from "rxjs";
var output = "";

// create observable
const observable = new Observable(function subscribe(subscriber) {
  const id = setInterval(() => {
    subscriber.next("hello");
  }, 1000);
});

// subscribe to observable
observable.subscribe((x) => console.log(x));
```
Try online: https://codesandbox.io/s/rxjs-observable-example-vllwq5?file=/src/index.ts


### Executing the Observable
There are three types of notifications send by an Observable:

- "Next" notification: sends a value such as a Number, a String, an Object, etc.
- "Error" notification: sends a JavaScript Error or exception.
- "Complete" notification: finished sending values

```
import { Observable } from "rxjs";

// create observable
const observable = new Observable(function subscribe(subscriber) {
  try {
    subscriber.next(1);
    subscriber.next(2);
    subscriber.next(3);
    // end observable data stream
    subscriber.complete();
  } catch (err) {
    // send error if necessary
    subscriber.error(err); // delivers an error if it caught one
  }
});

// subscribe to observable
observable.subscribe((x) => {
  console.log(x);
});
```
Try online: https://codesandbox.io/s/rxjs-observable-events-example-6fhwll?file=/src/index.ts


## Observer

## Producer

## Subscriptions

## Operators

## Error management
