import {has, hasNot} from '../../src/predicate';

/**
 * @author Daniel de Oliveira
 */
describe('has / hasNot', () => {

    it('has - true', () =>
        expect(

            has('a.b')({a: {b: 1}}))

            .toEqual(true));


    it('has - false', () =>
        expect(

            has('a.c')({a: {b: 1}}))

            .toEqual(false));


    it('hasNot - true', () =>
        expect(

            hasNot('a.c')({a: {b: 1}}))

            .toEqual(true));


    it('hasNot - false', () =>
        expect(

            hasNot('a.b')({a: {b: 1}}))

            .toEqual(false));
});