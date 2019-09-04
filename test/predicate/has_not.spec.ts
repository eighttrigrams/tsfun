import {hasNot} from '../../src/predicate';

/**
 * @author Daniel de Oliveira
 */
describe('hasNot', () => {


    it('hasNot - true', () =>
        expect(

            hasNot('a.c')({a: {b: 1}}))

            .toEqual(true));


    it('hasNot - false', () =>
        expect(

            hasNot('a.b')({a: {b: 1}}))

            .toEqual(false));
});