import { expect } from 'chai';
import SumType from '../src/sumtype';
import sinon from 'sinon';

// Mock implementation
interface MatchPattern<T> {
  Nothing(): T;
  Just<A>(a: A): T;
}
class Maybe<T> extends SumType<MatchPattern<T>> {}

function Just<T>(a: T): Maybe<T> {
  return new Maybe('Just', [a]);
}

function Nothing<T>(): Maybe<T> {
  return new Maybe('Nothing', []);
}

describe('SumType', () => {
  describe('equals', () => {
    it('is equal when both the kind and the wrapped value match', () => {
      expect(Just(1).equals(Just(1))).to.equal(true);
      expect(Just(1).equals(Just(2))).to.equal(false);
    });

    it('is not equal when the kind differ', () => {
      expect(Just(1).equals(Nothing())).to.equal(false);
    });
  });

  describe('toString', () => {
    it('outputs the kind and the data', () => {
      expect(Just(1).toString()).to.equal('Just [1]');
      expect(Nothing().toString()).to.equal('Nothing');
    });
  });

  describe('caseOf', () => {
    let nothingSpy;
    let justSpy;
    beforeEach(() => {
      nothingSpy = sinon.spy();
      justSpy = sinon.spy();
    });

    describe('Just', () => {
      beforeEach(() => {
        Just('foo').caseOf({
          Nothing: nothingSpy,
          Just: justSpy,
        });
      });

      it('calls the Just function on the pattern', () => {
        expect(nothingSpy.called).to.equal(false);
        expect(justSpy.calledWith('foo')).to.equal(true);
      });
    });

    describe('Nothing', () => {
      beforeEach(() => {
        Nothing().caseOf({
          Nothing: nothingSpy,
          Just: justSpy,
        });
      });

      it('calls the Just function on the pattern', () => {
        expect(nothingSpy.called).to.equal(true);
        expect(justSpy.called).to.equal(false);
      });
    });
  });
});
