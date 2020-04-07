import {is} from '../../../src/comparator';


/**
 * @author Daniel de Oliveira
 */
describe('is', () => {


    it('is', () =>
        expect(

            is('a')('a'))

            .toEqual(true));
});