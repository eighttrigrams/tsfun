/**
 * @author Daniel de Oliveira
 */
import {get} from '../../../src/associative';


describe('get', () => {

    it('object',() =>
        expect(

            get('a')({a: 'b', c: 'd'}))

            .toEqual('b'));


    it('array',() =>
        expect(

            get(0)([1, 2]))

            .toEqual(1));


    it('nothing',() =>
        expect(

            get(3)([1, 2]))

            .toBeUndefined());


    it('alternative - from object',() =>
        expect(

            get('a', undefined as any)({a: 'b', c: 'd'}))

            .toEqual('b'));

    it('alternative',() =>
        expect(

            get(0, undefined as any)([1, 2]))

            .toEqual(1));


    it('alternative - undefined',() =>
        expect(

            get(3, undefined as any)([1, 2]))

            .toEqual(undefined));


    it('alternative - alternative',() =>
        expect(

            get(7, 7)([1, 2]))

            .toEqual(7));
});
