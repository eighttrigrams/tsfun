import {size} from '../../../src/associative'
import {equal, samemap, sameset} from '../../../src/comparator'


/**
 * tsfun | sameset
 */
describe('sameset', () => {

    it('equivalent in different order', () => {

        expect(sameset([1, 4, 7])([7, 4, 1])).toEqual(true)
        expect(sameset([1, 4, 7], [7, 4, 1])).toEqual(true)
    })


    it('left side subset', () =>
        expect(

            sameset([1, 4], [7, 4, 1])

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



    xit('nested arrays different sizes', () =>
        expect(

            sameset
            ([1, [7, [5, 5, 7], 7]])
            ([[7, 7, [5, 5, 7], [5, 5, 7]], 1])

        ).toEqual(true))


    it('comparator - equivalent in different order', () => {

        // object items

        const samesize = l => r => size(l) === size(r)

        const l1 = [{a: 9, b: 10}, {c: 7}] as any
        const r1 = [{m: 9}, {a: 9, b: 10}] as any

        expect(
            sameset(samesize, l1, r1) // uncurried
        ).toEqual(true)

        expect(
            sameset(samesize, l1, r1) // curried
        ).toEqual(true)

        expect(
            sameset(samesize)(l1)(r1) // fully curried
        ).toEqual(true)


        // array items

        const l2 = [[2, 1], [3, 9]] as any
        const r2 = [[9, 3], [1, 2]] as any

        expect(
            sameset(l2)(r2)
        ).toEqual(false)
        expect(
            sameset(sameset)(l2)(r2)
        ).toEqual(true)
    })


    it('comparator usage', () => {

        expect(
            sameset(sameset, [[1, 2], [3, 4]], [[4, 3], [2, 1]])
        ).toBe(true)

        expect(
            sameset(equal, [[1], [7, 4]], [[7, 4], [1]])
        ).toEqual(true)

        expect(
            sameset(samemap, [{c: 7}, {c: 5, b: 4}], [{b: 4, c: 5}, {c: 7}])
        ).toEqual(true)
    })


    xit('sameset with objectBy - nest to arbitrary depth ', () =>
        expect(

            sameset
            ([{c: 7}, {c: [{g: [[1, 1, {m: 9, n: 10}], 8], d: 5}, 3], b: 4}])
            ([{b: 4, c: [3, {d: 5, g: [8, [1, {n: 10, m: 9}, 1]]}]}, {c: 7}])

        ).toEqual(true))


    it('comparator - different property value in same order', () =>
        expect(

            sameset(equal, [{a: 10}, {c: 7}, {b: 4}])([{a: 9}, {c: 7}, {b: 4}])

        ).toEqual(false));


    it('comparator - left list smaller', () =>
        expect(

            sameset<any>(equal, [{c: 7}])([{c: 7}, {b: 4}])

        ).toEqual(false))


    it('comparator - right list smaller', () =>
        expect(

            sameset(equal, [{c: 7}, {b: 4}])([{c: 7}])

        ).toEqual(false))


    it('comparator - single param list', () =>
        expect(

            sameset(equal, [{c: 7}, {b: 4}], [{c: 7}])

        ).toEqual(false))

})
