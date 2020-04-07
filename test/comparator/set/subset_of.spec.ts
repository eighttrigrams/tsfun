import {subsetOf} from "../../../src/comparator";

/**
 * tsfun | subsetOf
 *
 * @author Daniel de Oliveira
 */
describe('subsetOf', () => {

    it('subsetOf', () =>
        expect(

            subsetOf([3, 2, 7])([2, 7])

        ).toEqual(true));


    it('not subsetOf', () =>
        expect(

            subsetOf([3, 2, 7])([2, 7, 1])

        ).toEqual(false));


    it('same set - subset - elements duplicated', () =>
        expect(

            subsetOf([3, 1, 2])([1, 1])

        ).toEqual(true));


    it('same set - same elements - different order', () =>
        expect(

            subsetOf([3, 3, 2, 2])([3, 2, 3, 2])

        ).toEqual(true));


    it('length does not matter', () =>
        expect(

            subsetOf([1])([1, 1, 1])

        ).toEqual(true));
});