# Process module

## Events
Process module is an `EventEmitter`, so it can emit some events you can listen to.
Some events are:
- beforeExit: lauched when there app has nothing more to do. Beware: it's not launched when a program stops due to `process.exit()` call 
- exit
- message: when the process receives some message, i.e. whet it's a `child_process`
- uncaughtException: an exception has not been caught. Warning: as the system is now in an unknown/unconsistent state, it's not good practice to try not to exit the application. It's better to cleanup the app (with sync functions) and restart it 
- unhandledRejection
- warning: emitted when the application emits a warning. You can trigger it with `process.emitWarning()`

Example:
```js
process.on('uncaughtException', (err) => {
  // here the 1 is a file descriptor for STDERR
  fs.writeSync(1, `Caught exception: ${err}\n`)
})
```

## Signals
When the process receives POSIX signals from external, like with a `kill` OS command.
Some signals are:
- SIGTERM: triggers application shutdown. You can handle it to perform graceful shutdown.
- SIGURS1: user-defined signal 1, triggers debugger

## Useful methods and properties:
- `process.arch`: system architechture
- `process.argv`: an array of arguments passed on command line. For the element 0 use `process.argv0`
- `process.argv0`: first command lin argument
- `process.cwd()`: returns current work directory
- `process.env`: environment variables
- `process.exit([code])`: terminate the application returning to the OD a code (0 means ok)
- `process.execPath`
- `process.memoryUsage()`
- `process.pid`
- `process.platform`
- `process.resourceUsage()`
- `process.send()`: send a message
- `process.stdout`, `process.stdin`, `process.stderr`
- `process.uptime`
- `process.version`


### Process module resources:
- https://blog.risingstack.com/mastering-the-node-js-core-modules-the-process-module/
- https://nodejs.org/api/process.html
