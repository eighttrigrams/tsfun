import {hasnt} from '../../src/predicate';

/**
 * tsfun | hasnt
 *
 * @author Daniel de Oliveira
 */
describe('hasnt', () => {


    it('true', () =>
        expect(

            hasnt('a.c')({a: {b: 1}}))

            .toEqual(true));


    it('false', () =>
        expect(

            hasnt('a.b')({a: {b: 1}}))

            .toEqual(false));
});