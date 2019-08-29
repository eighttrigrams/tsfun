import {flow} from '../../src/composition';
import {lFilter, lMap, lTake, materialize} from '../../src/arraylist_lazy';



/**
 * @author Daniel de Oliveira
 */
describe('lMap / lFilter / lTake / materialize', () => {

    it('lMap', () =>
        expect(
            flow([1, 2, 3, 4, 5],
                lMap((_: number) => 2 * _),
                lFilter((_: number) => _ > 5),
                lTake(1),
                materialize))

            .toEqual([6]));
});