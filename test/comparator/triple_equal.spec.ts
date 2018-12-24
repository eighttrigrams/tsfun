import {is, isnt, tripleEqual} from '../../src/comparator';


/**
 * tripleEqual unsurprisingly uses comparison via `===`.
 * and can for example be used with filter
 *
 * @author Daniel de Oliveira
 */
describe('tripleEqual / is / isnt', () => {



    it('tripleEqual',() =>
        expect(

            tripleEqual('a')('a'))

            .toEqual(true));


    it('tripleEqual not equal',() =>
        expect(

            tripleEqual('a')('b'))

            .toEqual(false));


    it('is', () =>
        expect(

            is('a')('a'))

            .toEqual(true));


    it('isnt', () =>
        expect(

            isnt('a')('a'))

            .toEqual(false));
});