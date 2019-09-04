import {jsonEqual, on} from '../../src/comparator';
import {uniqueBy} from '../../src/arrayset';


/**
 * @author Daniel de Oliveira
 */
describe('uniqueBy', () => {


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
