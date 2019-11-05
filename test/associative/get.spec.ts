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

            .toThrow(Error('got nothing')));


    it('get - alternative - from object',() =>
        expect(

            get('a', undefined as any)({a: 'b', c: 'd'}))

            .toEqual('b'));

    it('get - alternative',() =>
        expect(

            get(0, undefined as any)([1, 2]))

            .toEqual(1));


    it('getOr - alternative - undefined',() =>
        expect(

            get(3, undefined as any)([1, 2]))

            .toEqual(undefined));


    it('get alternative - alternative',() =>
        expect(

            get(7, 7)([1, 2]))

            .toEqual(7));
});
