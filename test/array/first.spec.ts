import { first } from '../../src/array'


/**
 * tsfun | first
 */
describe('first', () => {

    it('first', () =>
        expect(

            first([4, 5])

        ).toEqual(4))


    it('undefined', () =>
        expect(

            first([])

        ).toBeUndefined())
})
