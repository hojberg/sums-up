import SumType from "../src/sumtype";
import sinon, { SinonSpy } from "sinon";

// Mock implementation
class Maybe<T> extends SumType<{ Just: [T]; Nothing: [] }> {}

function Just<T>(value: T): Maybe<T> {
  return new Maybe("Just", value);
}

function Nothing<T>(): Maybe<T> {
  return new Maybe("Nothing");
}

describe("SumType", () => {
  describe("equals", () => {
    test("is equal when both the kind and the wrapped value match", () => {
      expect(Just(1).equals(Just(1))).toEqual(true);
      expect(Just(1).equals(Just(2))).toEqual(false);
    });

    test("is not equal when the kind differ", () => {
      expect(Just(1).equals(Nothing())).toEqual(false);
    });
  });

  describe("toString", () => {
    test("outputs the kind and the data", () => {
      expect(Just(1).toString()).toEqual("Just [1]");
      expect(Nothing().toString()).toEqual("Nothing");
    });
  });

  // @deprecated
  describe("kind", () => {
    test("returns the name of the variant", () => {
      expect(Just(1).kind).toEqual("Just");
      expect(Nothing().kind).toEqual("Nothing");
    });
  });

  describe("type", () => {
    test("returns the name of the variant", () => {
      expect(Just(1).type).toEqual("Just");
      expect(Nothing().type).toEqual("Nothing");
    });
  });

  describe("caseOf", () => {
    let nothingSpy: SinonSpy<[], string>;
    let justSpy: SinonSpy<[unknown], string>;
    beforeEach(() => {
      nothingSpy = sinon.spy(() => "nothing");
      justSpy = sinon.spy((_) => "just");
    });

    describe("Just", () => {
      beforeEach(() => {
        Just("foo").caseOf({
          Nothing: nothingSpy,
          Just: justSpy,
        });
      });

      test("calls the Just function on the pattern", () => {
        expect(nothingSpy.called).toEqual(false);
        expect(justSpy.calledWith("foo")).toEqual(true);
      });
    });

    describe("Nothing", () => {
      beforeEach(() => {
        Nothing().caseOf({
          Nothing: nothingSpy,
          Just: justSpy,
        });
      });

      test("calls the Just function on the pattern", () => {
        expect(nothingSpy.called).toEqual(true);
        expect(justSpy.called).toEqual(false);
      });
    });

    describe("_", () => {
      let wildcardSpy: SinonSpy<[], string>;
      beforeEach(() => {
        wildcardSpy = sinon.spy(() => "wildcard");
      });

      test("calls the wildcard when no other kinds are given", () => {
        let value = Just("hello").caseOf({ _: wildcardSpy });
        expect(value).toEqual("wildcard");
        expect(wildcardSpy.calledWithExactly()).toEqual(true);
      });

      test("calls the wildcard when no matching kind is given", () => {
        let value = Just("hello").caseOf({
          Nothing: nothingSpy,
          _: wildcardSpy,
        });
        expect(value).toEqual("wildcard");
        expect(wildcardSpy.calledWithExactly()).toEqual(true);
        expect(nothingSpy.called).toEqual(false);
      });

      test("skips the wildcard when a matching kind is given", () => {
        let value = Just("hello").caseOf({ _: wildcardSpy, Just: justSpy });
        expect(value).toEqual("just");
        expect(wildcardSpy.called).toEqual(false);
        expect(justSpy.calledWithExactly("hello")).toEqual(true);
      });
    });

    describe("missing pattern", () => {
      test("throws the expected error when passed no patterns", () => {
        const value = Just("hello");
        expect(() => {
          value.caseOf({} as any);
        }).toThrowError("caseOf pattern is missing a function for Just");
      });

      test("throws the expected error when missing specific pattern", () => {
        const value = Just("hello");
        expect(() => {
          value.caseOf({ Nothing: () => {} } as any);
        }).toThrowError("caseOf pattern is missing a function for Just");
      });
    });
  });
});
