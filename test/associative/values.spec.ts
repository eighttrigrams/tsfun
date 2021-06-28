import {values} from '../../src/associative'


/**
 * tsfun | values
 */
describe('values', () => {

    it('object', () =>
        expect(

            values({a: 3, b: 4})

        ).toEqual([3, 4]))


    it('array', () =>
        expect(

            values({a: 3, b: 4})

        ).toEqual([3, 4]))


    it('typing', () => {

        const $1 = values([2])

        const $2 = values({a: 3})

        const $3 = values(3)
    })
})
