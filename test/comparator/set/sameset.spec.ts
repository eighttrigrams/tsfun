import {sameset} from "../../../src/comparator";


/**
 * tsfun | sameset
 *
 * sameset compares two Arrays in a way that the
 * left hand and right hand sides must constitute sets
 * with the same elements, meaning that
 * duplicates do count as one set item and
 * the order of the elements does not matter.
 *
 * It can be used in a flow context, where the arguments are given as separate argument lists,
 * as well as in a standard context, where the arguments are given in a single argument list.
 */
describe('sameset', () => {

    it('equivalent in different order', () => {

        expect(sameset([1, 4, 7])([7, 4, 1])).toEqual(true)
        expect(sameset([1, 4, 7], [7, 4, 1])).toEqual(true)
    })


    it('string - equivalent in different order', () =>
        expect(

            sameset('147', '741')

        ).toEqual(true))


    it('left side subset', () =>
        expect(

            sameset([1, 4], [7, 4, 1])

        ).toEqual(false))


    it('string - left side subset', () =>
        expect(

            sameset('14', '741')

        ).toEqual(false))


    it('left list smaller but same set', () =>
        expect(

            sameset([1, 4], [1, 4, 1, 4, 1])

        ).toEqual(true))


    it('right list smaller', () =>
        expect(

            sameset([1, 4, 7], [7, 4])

        ).toEqual(false))


    it('right list smaller but same set', () =>
        expect(

            sameset([1, 4, 1, 4, 1], [1, 4])

        ).toEqual(true))


    it('different elements', () =>
        expect(

            sameset([1, 4, 5], [7, 4, 1])

        ).toEqual(false))

    // The same rules apply on nested structures

    it('nested arrays', () =>
        expect(

            sameset([1, [4, 7]], [[7, 4], 1])

        ).toEqual(true))


    it('nested arrays different sizes', () =>
        expect(

            sameset
            ([1, [7, [5, 5, 7], 7]])
            ([[7, 7, [5, 5, 7], [5, 5, 7]], 1])

        ).toEqual(true))


    // using the default comparator, the order of keys does not matter

    it('default comparator is objectEqualBy(sameset)', () =>
        expect(

            sameset
            ([{c: 7}, {c: 5, b: 4}])
            ([{b: 4, c: 5}, {c: 7}])

        ).toEqual(true))

    // at any level

    it('sameset with objectBy - nest to arbitrary depth ', () =>
        expect(

            sameset
            ([{c: 7}, {c: [{g: [[1, 1, {m: 9, n: 10}], 8], d: 5}, 3], b: 4}])
            ([{b: 4, c: [3, {d: 5, g: [8, [1, {n: 10, m: 9}, 1]]}]}, {c: 7}])

        ).toEqual(true))


    it('typing', () => {

        sameset([], [])
        sameset([])([])
        // sameset('13')([]) // WRONG
        // sameset('13', []) // WRONG
        // sameset([1], ['1']) // WRONG
        // sameset([{a: 3}])([{b: 4}]) // WRONG
        // sameset(['1'])([3]) // WRONG
        // sameset(['1'], [3]) // WRONG
    })
});