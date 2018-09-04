import { Setoid, Show } from './utils';

function arrayEquals(a, b) {
  if (a === b) return true;
  if (a == null || b == null) return false;
  if (a.length != b.length) return false;

  for (var i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}

abstract class SumType<P> implements Setoid, Show {
  private kind: string;
  private data: any[];

  constructor(kind: string, ...data: any[]) {
    this.kind = kind;
    this.data = data;
  }

  public caseOf(pattern: P) {
    return pattern[this.kind](...this.data);
  }

  public equals(that: SumType<P>): boolean {
    return this.kind === that.kind && arrayEquals(this.data, that.data);
  }

  public toString(): string {
    if (this.data.length) {
      return `${this.kind} ${JSON.stringify(this.data)}`;
    }

    return this.kind;
  }
}

export default SumType;
