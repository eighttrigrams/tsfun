import {size} from '../../../src/associative'
import {endsWith, sameset} from '../../../src/comparator'


/**
 * tsfun | endsWith
 */
describe('endsWith', () => {

    it('array - true', () =>

        expect(

            endsWith([2, 3, 4])([1, 2, 3, 4])

        ).toBe(true)
    )


    it('array - same elements, same size', () =>

        expect(

            endsWith(['a', 'b', 'c'])(['a', 'b', 'c'])

        ).toBe(true)
    )


    it('array - false - too short', () =>

        expect(

            endsWith([2, 3, 4])([1, 2])

        ).toBe(false)
    )


    it('array - wrong', () =>

        expect(

            endsWith([1, 2])([3])

        ).toBe(false)
    )


    it('array - zero length', () =>

        expect(

            endsWith([])([])

        ).toBe(true)
    )


    it('comparator', () => {

        expect(
            endsWith(sameset, [[1,2]], [[3,5], [2,1]]) // uncurried
        ).toBe(true)

        expect(
            endsWith(sameset, [[1,2]])([[3,5], [2,1]]) // curried
        ).toBe(true)

        expect(
            endsWith(sameset)([[1,2]])([[3,5], [2,1]]) // fully curried
        ).toBe(true)
    })


    it('complex comparator', () => {

        const comp = sameset(a => b => size(a) === size(b))

        expect(
            endsWith(comp,
                [[{b: 4, c: 6}, {a: 3}]],
                [[{a: 17}],
                 [{a: 3}, {b: 4, c: 5}]])
        ).toBe(true)
    })
})
