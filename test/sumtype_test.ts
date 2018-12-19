import { expect } from 'chai';
import SumType from '../src/sumtype';
import sinon, { SinonSpy } from 'sinon';

// Mock implementation
class Maybe<T> extends SumType<{ Just: [T]; Nothing: [] }> {}

function Just<T>(value: T): Maybe<T> {
  return new Maybe('Just', value);
}

function Nothing<T>(): Maybe<T> {
  return new Maybe('Nothing');
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
    let nothingSpy: SinonSpy;
    let justSpy: SinonSpy;
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
