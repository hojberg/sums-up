import { Setoid, Show, Unshift } from "./utils";

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
export type VariantNameAndData<T extends Variants> = {
  [K in keyof T]: Unshift<T[K], K>;
}[keyof T];
export type ExhaustiveCasePattern<T extends Variants, R> = {
  [K in keyof T]: (...args: T[K]) => R;
};
export type CasePattern<T extends Variants, R> =
  | ExhaustiveCasePattern<T, R>
  | (Partial<ExhaustiveCasePattern<T, R>> & { _: () => R });

abstract class SumType<M extends Variants> implements Setoid, Show {
  private variantName: keyof M;
  private data: unknown[];

  constructor(...args: VariantNameAndData<M>) {
    let [variantName, ...data] = args;
    this.variantName = variantName;
    this.data = data;
  }

  // @deprecated
  public get kind(): keyof M {
    return this.variantName;
  }

  // Semi FSA compliancy
  public get type(): keyof M {
    return this.variantName;
  }

  public caseOf<T>(pattern: CasePattern<M, T>): T {
    if (this.variantName in pattern) {
      return (pattern[this.variantName] as any)(...this.data);
    } else if (pattern._) {
      return pattern._();
    } else {
      throw new Error(
        `caseOf pattern is missing a function for ${this.variantName}`
      );
    }
  }

  public equals(that: SumType<M>): boolean {
    return (
      this.variantName === that.variantName && arrayEquals(this.data, that.data)
    );
  }

  public toString(): string {
    if (this.data.length) {
      return `${this.variantName} ${JSON.stringify(this.data)}`;
    }

    return `${this.variantName}`;
  }
}

export default SumType;
