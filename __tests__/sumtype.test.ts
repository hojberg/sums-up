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
    test('is equal when both the kind and the wrapped value match', () => {
      expect(Just(1).equals(Just(1))).toEqual(true);
      expect(Just(1).equals(Just(2))).toEqual(false);
    });

    test('is not equal when the kind differ', () => {
      expect(Just(1).equals(Nothing())).toEqual(false);
    });
  });

  describe('toString', () => {
    test('outputs the kind and the data', () => {
      expect(Just(1).toString()).toEqual('Just [1]');
      expect(Nothing().toString()).toEqual('Nothing');
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

      test('calls the Just function on the pattern', () => {
        expect(nothingSpy.called).toEqual(false);
        expect(justSpy.calledWith('foo')).toEqual(true);
      });
    });

    describe('Nothing', () => {
      beforeEach(() => {
        Nothing().caseOf({
          Nothing: nothingSpy,
          Just: justSpy,
        });
      });

      test('calls the Just function on the pattern', () => {
        expect(nothingSpy.called).toEqual(true);
        expect(justSpy.called).toEqual(false);
      });
    });
  });
});
