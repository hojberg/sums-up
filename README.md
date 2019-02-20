👍 Sums Up
===

### Installation

```
npm install sums-up
```

### Example:

```typescript
import SumType from 'sums-up';

class Maybe<T> extends SumType<{ Just: [T]; Nothing: [] }> {}

function Just<T>(value: T): Maybe<T> {
  return new Maybe("Just", value);
}

function Nothing<T>(): Maybe<T> {
  return new Maybe("Nothing");
}

const x = Just("foo");

const result = x.caseOf({
  Nothing: () => "nope",
  Just: (a) => a + "bar",
});
```

### Wildcard Matching

If the kind of a sum type instance isn't present in the pattern given to `caseOf`, a default key called `_` will be used instead.

```ts
import SumType from 'sums-up';

class RequestState<T = never> extends SumType<{
  NotStarted: [];
  Connecting: [];
  Downloading: [number];
  Completed: [T];
  Failed: [string];
}> {}

const state = new RequestState('Failed', 'Connection reset.');
const progressPercentage = state.caseOf({
  Downloading: pct => pct,
  Completed: () => 100,
  _: () => 0
});
```

Contributors: @hojberg @dfreeman
