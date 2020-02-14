import {cond, val} from '../../src/composition';
import {isDefined} from '../../src/predicate';

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

            cond(isDefined, val(5))(3)

        ).toBe(5));
});