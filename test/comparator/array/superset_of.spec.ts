import {on, supersetOf} from '../../../src/comparator'


/**
 * tsfun | supersetOf
 */
describe('supersetOf', () => {

    it('empty', () =>
        expect(

            supersetOf([])([])

        ).toEqual(true))


    it('one entry', () => {

        expect(supersetOf([3])([3])).toEqual(true)
        expect(supersetOf([3], [3])).toEqual(true)
    })


    it('superset', () =>
        expect(

            supersetOf([3])([3, 1, 1])

        ).toEqual(true))


    it('subset false', () =>
        expect(

            supersetOf([3, 1])([1])

        ).toEqual(false))


    it('superset is empty', () =>
        expect(

            supersetOf([3, 1])([])

        ).toEqual(false))


    it('different order', () =>
        expect(

            supersetOf([3, 1, 3, 1])([1, 3, 1, 3])

        ).toEqual(true))


    it('length does not matter', () =>
        expect(

            supersetOf([3, 1, 3])([1, 3])

        ).toEqual(true))


    it('comparator', () => {

        expect(
            supersetOf(on('a'), [{a: 3}, {a: 4}], [{a: 4}]) // uncurried
        ).toEqual(false)

        expect(
            supersetOf(on('a'), [{a: 3}, {a: 4}])([{a: 4}]) // curried
        ).toEqual(false)

        expect(
            supersetOf(on('a'))([{a: 3}, {a: 4}])([{a: 4}]) // fully curried
        ).toEqual(false)
    })
})
