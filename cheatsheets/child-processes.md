# Child processes

In Node it's possible to run external OS commands or programs and treat them as `EventEmitter`s.
The module involved is `child_process` and the methods used are `spawn()`, `fork()`, `exec()`,
and `execFile()`.
Child processes can be piped with other child processes and with streams like `stdout`, `stdin` or `stderr`.
They expose too these streams.

## exec()
Exec creates a shell to run the process, so it's slightly less efficient than `spawn`.
The result is buffered and fully returned via callback when completely available, so avoid having
gigantic results.

As `exec` sends the code to a shell, avoid evil code to be injected if uses user input.

```js
const { exec } = require('child_process');

exec('find . -type f | wc -l', (err, stdout, stderr) => {
  if (err) {
    console.error(`exec error: ${err}`);
    return;
  }
  console.log(`Number of files ${stdout}`);
});
```

## spawn()
Spawn does not create a shell to run commands and streams both input and result, so
it's more efficient than `exec()`.

```js
const { spawn } = require('child_process');

// spawn 2 commands, with parameters in the array
const find = spawn('find', ['.', '-type', 'f']);
const wc = spawn('wc', ['-l']);

// pipes output of a command in the input of the other
find.stdout.pipe(wc.stdin);

// read the output of the last command
wc.stdout.on('data', (data) => {
  console.log(`Number of files ${data}`);
});
```

### spawn options
You can set an option to use shell syntax when invoking `spawn`:
```js
const child = spawn('find . -type f | wc -l', {
  stdio: 'inherit',     // inherits stdin, stdout, stderr from the main process
  shell: true,          // use shell syntax
  cwd: '/home/nicola',  // change work directory where the command is lauched
  env: { PORT: 3001 }   // set environment variables. Parent process' env variables are not inherited
});
```

### spawn detached option
Using the `detached` option, the child process becomes independent and has his own process id without parents.
The `unref()' method allows the child process not to end if the parent process exits before him.
```js
const { spawn } = require('child_process');
const child = spawn('node', ['timer.js'], {
  detached: true,
  stdio: 'ignore'
});
child.unref();
```

## execFile()
Just launches executables, without shell. It's used exactly like `exec`.
Notice: on Windows, `.bat` and `.cmd` files need a shell, so you cannot use `execFile` on them.

## spawnSync(), execSync(), execFileSync()
Those are the synchronous versions of the previous commands.
They are useful when writing simple synchronous code.

## fork()
It's a variation of `spawn` to start node processes.

There is a communication channel between parent and child processes:
```js
// computation.js
const longComputation = () => {
    let sum = 0;
    for (let i = 0; i < 1e9; i++) {
        sum += i;
    };
    return sum;
};
process.on('message', (msg) => {
    const sum = longComputation();
    process.send(sum);
});

// parent.js
const http = require('http');
const { fork } = require('child_process');
const server = http.createServer();
server.on('request', (req, res) => {
    if (req.url === '/compute') {
        const compute = fork('compute.js');
        compute.send('start');
        compute.on('message', sum => {
            res.end(`Sum is ${sum}`);
        });
    } else {
        res.end('Ok')
    }
});
server.listen(3000);
```
In this example when parent process receives a `/compute` request, starts a child process with `fork()`
and sends him `start` message to begin a heavy calculation.
The listens the `message` event to receive the result.

### Child process resources
- https://www.freecodecamp.org/news/node-js-child-processes-everything-you-need-to-know-e69498fe970a/
- https://nodejs.org/api/child_process.html

