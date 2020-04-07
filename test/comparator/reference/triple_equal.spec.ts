import {is, isnt, tripleEqual} from '../../../src/comparator';


/**
 * tripleEqual unsurprisingly uses comparison via `===`.
 * and can for example be used with filter
 *
 * @author Daniel de Oliveira
 */
describe('tripleEqual', () => {


    it('tripleEqual',() =>
        expect(

            tripleEqual('a')('a'))

            .toEqual(true));


    it('tripleEqual not equal',() =>
        expect(

            tripleEqual('a')('b'))

            .toEqual(false));
});