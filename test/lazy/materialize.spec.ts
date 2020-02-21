import {filter, map, take, materialize} from '../../src/lazy';
import {flow} from '../../src/composition';



/**
 * @author Daniel de Oliveira
 */
describe('materialize', () => {

    it('use case', () =>
        expect(

            flow([1, 2, 3, 4, 5],
                map((_: number) => 2 * _),
                filter((_: number) => _ > 5),
                take(1),
                materialize))

            .toEqual([6]));
});