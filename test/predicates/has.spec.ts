import {has} from '../../src/predicates';


/**
 * @author Daniel de Oliveira
 */
describe('has', () => {

    it('has - true', () =>
        expect(

            has('a.b')({a: {b: 1}}))

            .toEqual(true));


    it('has - false', () =>
        expect(

            has('a.c')({a: {b: 1}}))

            .toEqual(false));
});