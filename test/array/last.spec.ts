import { last } from '../../src/array';


/**
 * tsfun | last
 */
describe('last', () => {

    it('last', () =>
        expect(

            last([4, 5])

        ).toEqual(5))


    it('undefined', () =>
        expect(

            last([])

        ).toBeUndefined())
})
