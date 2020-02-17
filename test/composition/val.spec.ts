import {pairWith, val} from '../../src/composition';
import {map} from '../../src/associative';

/**
 * tsfun | val
 *
 * @author Daniel de Oliveira
 */
describe('val', () => {

    it('demo', () =>
        expect(

            val(3)()

        ).toBe(3));


    // use case

    it('use case', () =>
        expect(

            map(pairWith(val(5)))([3, 7])

        ).toEqual([[3, 5], [7, 5]]));
});