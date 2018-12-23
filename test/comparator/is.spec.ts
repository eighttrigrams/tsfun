import {is, isnt} from '../../src/comparator';

/**
 * @author Daniel de Oliveira
 */
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