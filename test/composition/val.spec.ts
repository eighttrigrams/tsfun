import {val} from '../../src/composition'
import {map_a} from '../../src/associative'
import {pairWith} from '../../src/tuple'


/**
 * tsfun | val
 */
describe('val', () => {

    it('demo', () =>
        expect(

            val(3)()

        ).toBe(3))

    it('use case', () =>
        expect(

            map_a(pairWith(val(5)))([3, 7])

        ).toEqual([[3, 5], [7, 5]]))
})
