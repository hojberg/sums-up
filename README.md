👍 Sums Up
===

### Installation

```
npm install sums-up
```

### Example:

```typescript
import SumType from 'sums-up';

interface MatchPattern<T, A> {
  Nothing(): T;
  Just(a: A): T;
}

class Maybe<T, A> extends SumType<MatchPattern<T, A>> { }

function Just<T, A>(a: A): Maybe<T, A> {
  return new Maybe("Just", a);
}

function Nothing<T, A>(): Maybe<T, A> {
  return new Maybe("Nothing");
}

const x = Just("foo");

const result = x.caseOf({
  Nothing: () => "nope",
  Just: (a) => a + "bar",
});
```
