# Events
Promises and many other features are made with event management.
Events are used trough EventEmitter class.

## Creating, listening and emitting
```js
// creating an EventEmitter
const myEmitter = new EventEmitter();

// registering three callbacks. 
myEmitter.on('eventOne', callback1);
myEmitter.on('eventOne', callback2);
myEmitter.addListener('eventOne', callback3);   // on and addListener are synonyms

// emitting the event
myEmitter.emit('eventOne'); // all the three callbacks will be called
```

## Once listener
Registers for an event that may be emitted only once. Internally, when the event is
listened for the first time, all its listeners will be removed.
```js
const myEmitter = new EventEmitter();
myEmitter.once('myEvent', myCallback);

myEmitter.emit('myEvent');  // lauches callback
myEmitter.emit('myEvent');  // does not launch any callback again
```

## Callback parameters
We can add parameters to callbacks
```js
myEmitter.on('status', (code, msg)=> console.log(`Got ${code} and ${msg}`));
myEmitter.emit('status', 200, 'ok');    // Got 200 and ok
```

## Unregistering events
You can remove listeners with `off` (or with `removeListener`):
```js
myEmitter.off('eventOne');
myEmitter.removeListener('eventOne', myCallback);
```

## Getting listeners
If you need the list of listeners linked to an event:
```js
const myEmitter = new EventEmitter();
myEmitter.on('eventOne', myCallback);

console.log(myEmitter.listenerCount());         // 1
console.log(myEmitter.listeners('eventOne'));   // array of listeners
console.log(myEmitter.rawListeners('eventOne'));   // array of listeners, including wrappers linke .once()
```

### Events resources
- https://www.freecodecamp.org/news/how-to-code-your-own-event-emitter-in-node-js-a-step-by-step-guide-e13b7e7908e1/
- https://nodejs.org/api/events.html
