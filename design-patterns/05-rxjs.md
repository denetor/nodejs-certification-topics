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
  setInterval(() => {
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
An Observer is a consumer of values delivered by an Observable.

When subscribing to an Observable we can pass an Observer to manage all the Observer message types:

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

// create observer
const observer = {
  next: (data) => {
    console.log("received data: " + data);
  },
  error: (e) => console.error(e),
  complete: () => console.info("observable completed")
};

// subscribe to observable
observable.subscribe(observer);
```
Try online: https://codesandbox.io/s/rxjs-observer-example-96loeb?file=/src/index.ts


## Subscriptions
A Subscription is an object able to wait for and receive data emitted from Observables.

A Subscription must be unsubscribed when no more necessary, to avoid data leaks.

```
import { Observable, Subscription } from "rxjs";

// create observable
const observable = new Observable(function subscribe(subscriber) {
  let i = 0;
  setInterval(() => {
    subscriber.next(i++);
    if (i > 5) {
      subscriber.complete();
    }
  }, 1000);
});

const observable2 = new Observable(function subscribe(subscriber) {
  let i = 0;
  let words = ["Hello", "world", "!"];
  setInterval(() => {
    subscriber.next(words[i++]);
    if (i > 2) {
      subscriber.complete();
    }
  }, 500);
});

// create subscription
const subscription = new Subscription();
// add subscriptions
subscription.add(
  observable.subscribe((data) => {
    console.log("observable emitted: " + data);
  })
);
subscription.add(
  observable2.subscribe((data) => {
    console.log("observable2 emitted: " + data);
  })
);

// cleanup all subscription s after some time
setInterval(() => {
  console.log("removing all subscriptions");
  subscription.unsubscribe();
}, 10000);
```
Try online: https://codesandbox.io/s/rxjs-subscription-example-i95qqd?file=/src/index.ts:0-969


## Operators and Pipes
There are 2 kinds of operators:

- Creation operators: functions returning a new Observable
- Pipeable operators: functions returning a new Observable, where value is a transformation of another Observable (left intact)

### Creation operators
```
import { Observable, Subscription, of, interval } from "rxjs";

// creating standard Observable
const observable = new Observable(function subscribe(subscriber) {
  subscriber.next(1);
  subscriber.next(2);
  subscriber.next(3);
  subscriber.complete();
});

// using of()
const observable2 = of(4, 5, 6);

// using interval()
const observable3 = interval(1000);

// create subscription
const subscription = new Subscription();

subscription.add(
  observable.subscribe((data) => {
    console.log("standard observable emitted: " + data);
  })
);

subscription.add(
  observable2.subscribe((data) => {
    console.log("'of' observable emitted: " + data);
  })
);

subscription.add(
  observable3.subscribe((data) => {
    console.log("'interval' observable emitted: " + data);
  })
);

subscription.add(
  of(7, 8, 9).subscribe((data) => {
    console.log("condensed 'of' observable emitted: " + data);
  })
);

setTimeout(() => {
  subscription.unsubscribe();
  console.log("unsubscribed to any subscription");
}, 5500);
```
Try online: https://codesandbox.io/s/rxjs-observable-example-vllwq5?file=/src/index.ts

### Pipeable operators
TODO: continue from here: https://rxjs.dev/guide/operators


## Subjects

## Producer

## Consumer

## Error management
