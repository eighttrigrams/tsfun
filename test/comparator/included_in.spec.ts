import {includedIn, includedInBy, jsonEqual} from '../../src/comparator';

/**
 * @author Daniel de Oliveira
 */
describe('includedIn/includedInBy', () => {

    // includedIn

    it('includedIn', () =>
        expect(

            includedIn([2, 5, 1])(1)

        ).toEqual(true));


    it('with filter', () =>
        expect(

            [1, 2, 7].filter(includedIn([2, 5, 1]))

        ).toEqual([1, 2]));


    // includedInBy

    it('includedInBy', () =>
        expect(

            includedInBy(jsonEqual)<any>([{a: 1}, {a: 2}])({a: 1})

        ).toEqual(true));
});