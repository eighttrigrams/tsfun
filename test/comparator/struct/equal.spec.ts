import {equal, sameset, samesetBy} from "../../../src/comparator";

/**
 * tsfun | equal
 *
 * Compares two values, which can be Structs or simple types.
 * Arrays are compared with arrayEqual.
 * Maps are compared with objectEqual.
 *
 * It can be used in a flow context, where the arguments are given as separate argument lists,
 * as well as in a standard context, where the arguments are given in a single argument list.
 */
describe('equal', () => {

    it('equal - number', () => {

        expect(equal(1, 1)).toEqual(true)
        expect(equal(1)(1)).toEqual(true)
    })


    it('strings equal', () =>
        expect(

            equal("2s", "2s")

        ).toEqual(true))


    it('strings not equal', () =>
        expect(

            equal("2s", "2st")

        ).toEqual(false))


    it('undefined', () =>
        expect(

            equal(undefined, undefined)

        ).toEqual(true))


    it('Date true', () =>
        expect(

            equal(new Date(2018, 11), new Date(2018, 11))

        ).toEqual(true))


    it('Date false', () =>
        expect(

            equal(new Date(2018, 11), new Date(2018, 12))

        ).toEqual(false))


    it('equal - number vs string', () =>
        expect(

            equal(1, '1' as any)

        ).toEqual(false))


    it('equal - mutual default nesting, order matters in arrays, but not for keys', () =>
        expect(

            equal
            ({a: [2, {b: 4, a: [1, {f: [1, 2], e: 7}]}], c: 5})
            ({c: 5, a: [2, {a: [1, {e: 7, f: [1, 2]}], b: 4}]})

        ).toEqual(true));


    it('Array - recursive Object Array Nesting', () =>
        expect(

            equal
            ([2, {b: 4, a: [1, {f: [1, 2], e: 7}]}])
            ([2, {a: [1, {e: 7, f: [1, 2]}], b: 4}])

        ).toEqual(true));


    it('Array - recursive Object Array Nesting - Array order matters!', () =>
        expect(

            equal
            ([2, {b: 4, a: [1, {f: [2, 1], e: 7}]}])
            ([2, {a: [1, {e: 7, f: [1, 2]}], b: 4}])

        ).toEqual(false));


    it('equal - single- or multiparameter-list', () => {

        expect(equal(1)(1)).toEqual(true)
        expect(equal(1, 1)).toEqual(true)
        expect(equal(1)(2)).toEqual(false)
        expect(equal(undefined)(undefined)).toEqual(true)
        expect(equal(undefined, undefined)).toEqual(true)
        expect(equal(undefined, 1)).toEqual(false)
        expect(equal(1, undefined)).toEqual(false)
    });


    it('typing', () => {

        const result1: true = equal(undefined, undefined);
        const result2: true = equal(undefined)(undefined);
        const result3: boolean = equal(2, undefined);
        const result5: boolean = equal(undefined)(2);
        const result6: boolean = equal(undefined)(2);

        // const result: boolean = equal(2)(undefined); // WRONG
        // const result: boolean = equal(2)('2');       // WRONG
        // const result: boolean = equal('1', 1)) // WRONG
        // const result = equal(new Date(2018, 11), {}) // WRONG
        // const result = equal(new Date(2018, 11))({}) // WRONG
    })


    it('comparator - Object - recursive Object Array Nesting', () =>
        expect(

            equal(sameset,
                {a: [2, {b: 4, a: [1, {f: [1, 2], e: 7}]}], c: 5})
            ({c: 5, a: [2, {a: [1, {e: 7, f: [2, 1]}], b: 4}]})

        ).toEqual(true))


    it('comparator - Object - one param list - recursive Object Array Nesting', () =>
        expect(

            equal(
                sameset,
                {a: [2, {b: 4, a: [1, {f: [1, 2], e: 7}]}], c: 5},
                {c: 5, a: [2, {a: [1, {e: 7, f: [2, 1]}], b: 4}]})

        ).toEqual(true))


    it('comparator - Array - recursive Object Array Nesting', () =>
        expect(

            equal(
                sameset,
                [2, {b: 4, a: [1, {f: [2, 1], e: 7}]}])
            ([2, {a: [1, {e: 7, f: [1, 2]}], b: 4}])

        ).toEqual(true));


    // err case

    it('too many params in first list', () =>
        expect(

            () => (equal as any)(1, 2, 3)

        ).toThrow());
});