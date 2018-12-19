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
