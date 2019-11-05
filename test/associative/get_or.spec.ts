/**
 * @author Daniel de Oliveira
 */
import {getOr} from '../../src/associative';


describe('getOr', () => {

    it('getOr - from object',() =>
        expect(

            getOr('a', undefined as any)({a: 'b', c: 'd'}))

            .toEqual('b'));

    it('getOr',() =>
        expect(

            getOr(0, undefined as any)([1, 2]))

            .toEqual(1));


    it('getOr - undefined',() =>
        expect(

            getOr(3, undefined as any)([1, 2]))

            .toEqual(undefined));


    it('getOr - alternative',() =>
        expect(

            getOr(7, 7)([1, 2]))

            .toEqual(7));
});
