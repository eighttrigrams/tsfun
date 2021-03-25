import {keysValues} from '../../src/associative'


/**
 * tsfun | keysValues
 */
describe('keysValues', () => {

    it('array', () =>
        expect(

            keysValues({a: 3, b: 4})

        ).toEqual([['a', 3], ['b', 4]]))


    it('array', () =>
        expect(

            keysValues(['a', 'b'])

        ).toEqual([[0, 'a'], [1, 'b']]))


    it('typing', () => {

        const $1 = keysValues(['a','b'])

        const $2 = keysValues({a: 1, b: 2})

        // const $3 = keysValues(3) // never
    })
})
