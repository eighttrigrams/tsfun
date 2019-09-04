import {containedInBy, on} from '../../src/comparator';


/**
 * @author Daniel de Oliveira
 */
describe('containedInBy', () => {


    it('containedInBy', () =>
        expect(

            containedInBy(on('a'))([{a: 3}, {a: 4}])([{a: 4}])

        ).toEqual(true));
});