# Asynchronous control-flow patterns

## Callback sequential iteration
```
function iterate(index) {
  if (index === tasks.length) {
    // exit when cycled all tasks
    return finish();
  }
  // execute next task
  const task = tasks[index];
  task(() => iterate(index+1));
}
function finish() {
  ...
}

// start iteration
iterate(0);
```

To add better readability we could wrap all into functin like:
```
iterateSerie(tasks, forEachCallback, finishCallback);
```
