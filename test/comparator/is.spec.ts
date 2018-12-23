/**
 * @author Daniel de Oliveira
 */
import {is, isnt} from '../../src/comparator';


describe('is / isnt', () => {

    it('is', () =>
        expect(

            is('a')('a'))

            .toEqual(true));


    it('isnt', () =>
        expect(

            isnt('a')('a'))

            .toEqual(false));
});