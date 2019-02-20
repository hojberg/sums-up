import { Setoid, Show, Unshift } from './utils';

function arrayEquals(a: unknown[] | undefined, b: unknown[] | undefined) {
  if (a === b) return true;
  if (a == null || b == null) return false;
  if (a.length != b.length) return false;

  for (var i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}

export type Variants = { [key: string]: unknown[] };
export type KindAndData<T extends Variants> = { [K in keyof T]: Unshift<T[K], K> }[keyof T];
export type ExhaustiveCasePattern<T extends Variants, R> = { [K in keyof T]: (...args: T[K]) => R };
export type CasePattern<T extends Variants, R> =
  | ExhaustiveCasePattern<T, R>
  | Partial<ExhaustiveCasePattern<T, R>> & { _: () => R };

abstract class SumType<M extends Variants> implements Setoid, Show {
  private kind: keyof M;
  private data: unknown[];

  constructor(...args: KindAndData<M>) {
    let [kind, ...data] = args;
    this.kind = kind;
    this.data = data;
  }

  public caseOf<T>(pattern: CasePattern<M, T>): T {
    if (this.kind in pattern) {
      return (pattern[this.kind] as any)(...this.data);
    } else {
      return pattern._();
    }
  }

  public equals(that: SumType<M>): boolean {
    return this.kind === that.kind && arrayEquals(this.data, that.data);
  }

  public toString(): string {
    if (this.data.length) {
      return `${this.kind} ${JSON.stringify(this.data)}`;
    }

    return `${this.kind}`;
  }
}

export default SumType;
