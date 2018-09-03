interface Setoid {
  equals(a: Setoid): boolean;
}

interface Ord {
  lte(a: Ord): boolean;
}

interface Show {
  toString(): string;
}

export { Setoid, Ord, Show };
