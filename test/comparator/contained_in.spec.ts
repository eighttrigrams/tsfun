import {containedIn, containedInBy, on} from '../../src/comparator';


/**
 * @author Daniel de Oliveira
 */
describe('containedIn/containedInBy', () => {


    it('containedIn', () =>
        expect(

            containedIn([3, 2, 7])([2, 7])

        ).toEqual(true));


    it('not containedIn', () =>
        expect(

            containedIn([3, 2, 7])([2, 7, 1])

        ).toEqual(false));

    // containedInBy

    it('containedInBy', () =>
        expect(

            containedInBy(on('a'))([{a: 3}, {a: 4}])([{a: 4}])

        ).toEqual(true));
});