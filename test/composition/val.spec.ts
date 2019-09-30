/**
 * tsfun | val
 *
 * @author Daniel de Oliveira
 */
import {cond} from '../../src/composition';
import {isDefined} from 'tsfun-core/src/predicate';
import {val} from 'tsfun-core';


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