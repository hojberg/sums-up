👍 Sums Up
===

### Installation

```
npm install sums-up
```

### Example:

```typescript
import SumType from 'sums-up';

interface MatchPattern<T> {
  Nothing(): T;
  Just<A>(a: A): T;
}

class Maybe<T> extends SumType<MatchPattern<T>> { }

function Just<T>(a: T): Maybe<T> {
  return new Maybe("Just", [a]);
}

function Nothing<T>(): Maybe<T> {
  return new Maybe("Nothing", []);
}

const x = Just("foo");

const result = x.caseOf({
  Nothing: () => "nope",
  Just: (a) => a + "bar",
});
```
