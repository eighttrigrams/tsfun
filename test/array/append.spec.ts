import {append} from '../../src/array'


/**
 * tsfun | append
 */
describe('append', () => {

    it('append', () =>

        expect(

            append(1, 2)([3, 4])

        ).toEqual([3, 4, 1, 2]))
})
