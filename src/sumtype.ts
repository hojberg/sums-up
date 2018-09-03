import { Setoid, Show } from './utils';

abstract class SumType<P> implements Setoid, Show {
  private kind: string;
  private data: any[];

  constructor(kind: string, data: any[]) {
    this.kind = kind;
    this.data = data;
  }

  public caseOf(pattern: P) {
    return pattern[this.kind](...this.data);
  }

  public equals(a: SumType<P>): boolean {
    return this.kind === this.kind && this.data === this.data;
  }

  public toString(): string {
    if (this.data.length) {
      return `${this.kind}(${JSON.stringify(this.data)})`;
    }

    return this.kind;
  }
}

export default SumType;
