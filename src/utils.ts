interface Setoid {
  equals(a: Setoid): boolean;
}

interface Show {
  toString(): string;
}

export { Setoid, Show };
