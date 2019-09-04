import {containedIn} from '../../src/comparator';


/**
 * @author Daniel de Oliveira
 */
describe('containedIn', () => {


    it('containedIn', () =>
        expect(

            containedIn([3, 2, 7])([2, 7])

        ).toEqual(true));


    it('not containedIn', () =>
        expect(

            containedIn([3, 2, 7])([2, 7, 1])

        ).toEqual(false));
});