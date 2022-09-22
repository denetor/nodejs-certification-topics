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

### Producer
Producer is an internal component of the Observable, the "thig" that creates the actual data emitted by Observable.


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
Some of these operators are:
- from
- of
- interval
- ajax
- bindCallback
- timer
- range
See complete list at https://rxjs.dev/guide/operators#creation-operators-1

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

subscription.add(
  from([10, 11, 12]).subscribe((data) => {
    console.log("'from' observable emitted: " + data);
  })
);

setTimeout(() => {
  subscription.unsubscribe();
  console.log("unsubscribed to any subscription");
}, 5500);
```
Try online: https://codesandbox.io/s/rxjs-observable-example-vllwq5?file=/src/index.ts

### Pipeable operators
Are used to transform or filter data coming from Observables. Piping them together allows to concatenate transformations.

Some sample operators are:
- map
- mergeMap
- concat
- forkJoin
- race
- debounce
- distinct
- filter
- last
- take
- takeUntil
- find
- isEmpty
- count
- reduce

A complete listing is available at https://rxjs.dev/guide/operators#join-creation-operators

```
import { Subscription, of, filter, distinct, take, reduce, delay } from "rxjs";

const subscription = new Subscription();

const results = {
  noFilters: [],
  even: [],
  evenGt5: [],
  sumFirst2Odd: []
};

// subscription with no operators
subscription.add(
  of(0, 1, 2, 3, 4, 5, 6, 7, 8, 9).subscribe((n) => {
    results.noFilters.push(n);
  })
);

// simple filtering only even numbers
subscription.add(
  of(0, 1, 2, 3, 4, 5, 6, 7, 8, 9)
    .pipe(filter((n) => n % 2 === 0))
    .subscribe((n) => {
      results.even.push(n);
    })
);

// 2 filters piped together
subscription.add(
  of(0, 1, 2, 3, 4, 5, 6, 7, 8, 9)
    .pipe(
      filter((n) => n >= 5),
      filter((n) => n % 2 === 0)
    )
    .subscribe((n) => {
      results.evenGt5.push(n);
    })
);

// sums first 2 distinct odd numbers (1+3)
subscription.add(
  of(0, 1, 1, 1, 1, 1, 2, 3, 4, 5, 6, 7, 8, 9)
    .pipe(
      filter((n) => n % 2 === 1),
      distinct(),
      take(2),
      reduce((acc, curr) => (acc += curr))
    )
    .subscribe((n) => {
      results.sumFirst2Odd.push(n);
    })
);

// instead of using setTimeout we use an observable piped to a delay operator
subscription.add(
  of(1)
    .pipe(delay(500))
    .subscribe(() => {
      subscription.unsubscribe();
      console.log("unsubscribing all subscriptions");
      for (const row in results) {
        console.log(row + ": " + results[row].join(","));
      }
    })
);
```
Try online: https://codesandbox.io/s/rxjs-operators-example-5uolqe?file=/src/index.ts


### Common ionteractions with rxjs
Sometimes it's useful to treat other data sources as Observables.

#### Array
```
from([{name: 'Adam', name: 'Bob', name: 'Craig'}]).subscribe((person) => {
    console.log("Processing: " + person.name);
});
```

#### UI Event
```
import { fromEvent } from "rxjs";

fromEvent(document.getElementById("someButton"), "click").subscribe((event) => {
  document.getElementById("output").innerHTML = `thanks`;
});
```
Try online: https://codesandbox.io/s/rxjs-operator-fromevent-example-fv6dh9

#### Callbacks
```
import { bindCallback } from "rxjs";

function oldFunction(cb) {
  setTimeout(() => cb(null, 'Hello'), 1000);
}

bindCallback(oldFunction).subscribe((err, data) => {
  console.log('oldFunction returned: ' + data);
});
```

#### HTTP Calls
```
import { lastValueFrom } from "rxjs";

const config: AxiosRequestConfig = {...};
const response = await lastValueFrom(this.httpService.request(config));
console.log(response.data);
```


#### fetch()
`fetch()` is a web standard API available in browsers.
It's **based on Promises** so we have to convert it to an Observable to use it with RxJs. Submitting to this Observable we obtain a Response object: we have to convert this Response to json witn json() method, but json() too returns a Promise.

So we have two Observables nested and must be combined with some operator. This operator can be **mergeMap** (ex flatMap).

Example:
```
let observable = Rx.Observable.from(fetch('some url')
  .mergeMap( response => Rx.Observable.from(response.json())));
observable.subscribe(data => console.log(data));
```

#### ajax()
`ajax()' is a service provided in RxJs Library and is based on Observable.

```
let observable = Rx.Observable.ajax('some url')
    .map(r => r.response);
observable.subscribe(data => console.log(data));
```

#### Cascading calls
In the real world calls are often performed after the response from other calls arrives. This happens when you must perform login before retrieving some other data.
Moreover, it's common to have to fetch some other calls in parallel, as they are not dependant each other.

As example we can do:
- login
- fetch user information
- fetch, in parallel, other information given the user

```
import Rx from 'rxjs/Rx';
const username = 'john';
const password = 'johnrulez';

login(user, password)
  .switchMap(getUser)
  .switchMap(getUserData);
  
// this is the equivalent of
// login()
//   .then(getUser)
// .then(getUserData);
  
const login = (username, password) => {
  return Rx.Observable.ajax('/login', {
    method: 'POST',
    body: {username, password},
  })
  .map(r => r.response)
  .do(token => localStorage.set('jwtToken', token));
}

const getUser = () => {
  return Rx.Observable.ajax('/users', {
    headers: { Authorization: 'Bearer ' + localStorage.get('jwtToken')}
  }).map(r => r.response);
}

getUserData(user) {
  return Rx.Observable.forkJoin([
    getOrders(),
    getMessages(),
    getFriends(),
  ]);
}

const getOrders = () => {
  return Rx.Observable.json('/orders/user/' + user.id, {...}).map(r => r.response);
}
const getMessages = () => {
  return Rx.Observable.json('/messages/user/' + user.id, {...}).map(r => r.response);
}
const getFriends = () => {
  return Rx.Observable.json('/friends/user/' + user.id, {...}).map(r => r.response);
}
```

#### Cascading calls in nestjs
With lastValueFrom operator we can confert an observable to a Promise we can return.
```
async allTests(): Promise<any> {
    return lastValueFrom(
        rxjs.forkJoin([
            this.coherenceCheckService.checkPeople(),
            this.coherenceCheckService.supplyAddresses(),
        ]),
    ).then((response) => {
        return {
            people: response[0],
            addresses: response[1],
        };
    });
}
```


## Subjects
TODO: continue from here: https://rxjs.dev/guide/operators

## Consumer

## Error management
