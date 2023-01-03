## Principles
- __Single source of truth__: State is the only place where data lives
- __State is read-only__: state is changed only trough actions
- __Changes are made with pure functions__: the old state must not be changed, if an update is needed, we take the previous state, apply the changes and return a new state.

