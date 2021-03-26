import {lFilter, materialize} from '../../src/lazy'
import {greaterThan} from '../../src/comparator'


/**
 * tsfun | lFilter
 */
describe('lFilter', () => {

    it('filter', () => expect(

        materialize(lFilter(greaterThan(3))([4, 2, 1]))

    ).toEqual([4]))
})
