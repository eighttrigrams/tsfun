/**
 * @author Daniel de Oliveira
 */
import {get} from '../../src/associative';


describe('get', () => {

    it('get - from object',() =>
        expect(

            get('a')({a: 'b', c: 'd'}))

            .toEqual('b'));


    it('get',() =>
        expect(

            get(0)([1, 2]))

            .toEqual(1));


    it('get nothing',() =>
        expect(

            () => get(3)([1, 2]))

            .toThrow(Error('nth, got nothing')));
});
