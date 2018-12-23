/**
 * @author Daniel de Oliveira
 */
import {jsonEqual, on} from '../../src/comparators';
import {unique, uniqueBy} from '../../src/arrayset';


describe('unique/uniqueBy', () => {


    // unique

    it('unique', () =>
        expect(

            unique([1, 1, 7, 8, 7, 1]))

            .toEqual([1, 7, 8]));


    it('unique - of none', () =>
        expect(

            unique([]))

            .toEqual([]));


    // uniqueBy

    it('uniqueBy with on', () =>
        expect(
            uniqueBy(on('a'))([{a: 1}, {a: 2}, {a: 1}])
        ).toEqual([{a: 1}, {a: 2}])
    );


    it('uniqueBy', () =>
        expect(

            uniqueBy(jsonEqual)([{a: 'c'}, {a: 'c'}]))

            .toEqual([{a: 'c'}]));
});
