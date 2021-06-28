import {pair} from '../../src/tuple'

/**
 * tsfun | pair
 */
describe('pair', () => {

    it('pair', () =>
        expect(

            pair(3, 'a')

        ).toEqual([3, 'a'])
    )
})
