interface Setoid {
  equals(a: Setoid): boolean;
}

interface Show {
  toString(): string;
}

type Unshift<T extends any[], V, U = (a: V, ...b: T) => void> = U extends (...x: infer R) => void ? R : never;

export { Setoid, Show, Unshift };
