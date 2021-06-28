import {equal} from '../../../src/comparator'

/**
 * tsfun | equal
 */
describe('equal', () => {

    it('base case', () => {

        expect(
            equal({a: 3}, {a: 3})
        ).toEqual(true)
        expect(
            equal({a: 3}, {a: 4})
        ).toEqual(false)

        // curried

        expect(
            equal({a: 3})({a: 3})
        ).toEqual(true)
        expect(
            equal({a: 3})({a: 4})
        ).toEqual(false)
    })


    it('equal - mutual default nesting, order matters in arrays, but not for keys', () =>
        expect(

            equal
            ({a: [2, {b: 4, a: [1, {f: [1, 2], e: 7}]}], c: 5})
            ({c: 5, a: [2, {a: [1, {e: 7, f: [1, 2]}], b: 4}]})

        ).toEqual(true))


    it('Array - recursive Object Array Nesting', () =>
        expect(

            equal
            ([2, {b: 4, a: [1, {f: [1, 2], e: 7}]}])
            ([2, {a: [1, {e: 7, f: [1, 2]}], b: 4}])

        ).toEqual(true))


    it('Array - recursive Object Array Nesting - Array order matters!', () =>
        expect(

            equal
            ([2, {b: 4, a: [1, {f: [2, 1], e: 7}]}])
            ([2, {a: [1, {e: 7, f: [1, 2]}], b: 4}])

        ).toEqual(false))


    it('nesting', () => {

        expect(
            equal([1, {a: [2, {b: 4}]}], [1, {a: [2, {b: 4}]}])
        ).toBe(true)
    })
})
