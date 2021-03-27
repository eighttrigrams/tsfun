import {lFilter, materialize} from '../../src/lazy'
import {gt} from '../../src/comparator'


/**
 * tsfun | lFilter
 */
describe('lFilter', () => {

    it('filter', () => expect(

        materialize(lFilter(gt(3))([4, 2, 1]))

    ).toEqual([4]))
})
