import {lTake, lFilter, materialize} from '../../src/lazy'
import {flow} from '../../src/composition'
import {gt} from '../../src/comparator'


/**
 * tsfun/lazy | take
 */
describe('lazy/take', () => {

    it('take', () => expect(

        materialize(lTake(1)([4, 2, 1]))

    ).toEqual([4]))


    it('use case', () => expect(

        flow(
            [2, 4, 2, 7, 1, 5],
            lFilter(gt(2)),
            lTake(2),
            materialize)

    ).toEqual([4, 7]))
})
