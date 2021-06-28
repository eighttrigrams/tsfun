import {same, sameset} from '../../../src/comparator'

/**
 * tsfun | same
 */
describe('same', () => {

    it('base case', () => {

        expect(
            same([1, 2], [1, 2])
        ).toEqual(true)

        // curried

        expect(
            same([1, 2])([1, 2])
        ).toEqual(true)
    })


    it('elements get compared via === by default', () => {

        const a = {a: 3}
        const b = {b: 4}

        expect(
            same([{a: 3}, {b: 4}], [{a: 3}, {b: 4}])
        ).toEqual(false)
        expect(
            same([a, b], [a, b])
        ).toEqual(true)
    })


    it('using sameset comparator -> order of array elements will not matter', () => {

        expect(
            same(sameset, [[2, 1], [3]], [[1, 2], [3]])   // uncurried
        ).toEqual(true)

        expect(
            same(sameset, [[2, 1], [3]])([[1, 2], [3]])   // curried
        ).toEqual(true)

        expect(
            same(sameset)([[2, 1], [3]])([[1, 2], [3]]) // fully curried
        ).toEqual(true)
    })
})
