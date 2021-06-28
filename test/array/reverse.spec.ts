import { reverse } from '../../src/array'


/**
 * tsfun | reverse
 */
describe('reverse', () => {

    it('basic', () =>
        expect(

            reverse([2, 7, 3])

        ).toEqual([3, 7, 2])
    )
})
