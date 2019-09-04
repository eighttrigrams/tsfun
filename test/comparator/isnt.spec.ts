import {isnt} from '../../src/comparator';


/**
 * @author Daniel de Oliveira
 */
describe('isnt', () => {


    it('isnt', () =>
        expect(

            isnt('a')('a'))

            .toEqual(false));
});