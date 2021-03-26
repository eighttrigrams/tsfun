import {lFilter, lMap, lTake, materialize} from '../../src/lazy'
import {flow} from '../../src/composition'



/**
 * tsfun/lazy | materialize
 */
describe('lazy/materialize', () => {

    it('use case', () =>
        expect(

            flow([1, 2, 3, 4, 5],
                lMap((_: number) => 2 * _),
                lFilter((_: number) => _ > 5),
                lTake(1),
                materialize))

            .toEqual([6]))
})
