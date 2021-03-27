import {includedIn, jsonEqual} from '../../../src/comparator'


/**
 * tsfun | includedIn
 */
describe('includedIn', () => {

    it('includedIn', () =>
        expect(

            includedIn([2, 5, 1])(1)

        ).toEqual(true));


    it('with filter', () =>
        expect(

            [1, 2, 7].filter(includedIn([2, 5, 1]))

        ).toEqual([1, 2]));


    it('includedInBy', () =>
        expect(

            includedIn<any>(jsonEqual, [{a: 1}, {a: 2}])({a: 1})

        ).toEqual(true))
})
