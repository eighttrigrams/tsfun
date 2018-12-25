import {getOrElse, get} from '../../src/arraylist_objectstruct';


/**
 * @author Daniel de Oliveira
 */
describe('get / getOrElse', () => {

    // Both Array and Map are associative

    // getOrElse

    it('getOrElse array',() =>
        expect(

            getOrElse([1, 2], undefined)(0))

            .toEqual(1));


    it('getOrElse array - undefined',() =>
        expect(

            getOrElse([1, 2], undefined)(3))

            .toEqual(undefined));


    it('getOrElse array - alternative',() =>
        expect(

            getOrElse([1, 2], 7)(3))

            .toEqual(7));


    it('getOrElse object',() =>
        expect(

            getOrElse({a: {b: 4}}, undefined)('a.b'))

            .toEqual(4));


    it('getOrElse object - undefined',() =>
        expect(

            getOrElse({a: {b: 4}}, undefined)('c.d'))

            .toEqual(undefined));


    it('getOrElse object - alternative',() =>
        expect(

            getOrElse({a: {b: 4}}, 8)('c.d'))

            .toEqual(8));


    it('wrap - with getElForPathIn and false',() =>
        expect(

            getOrElse({a: false}, undefined)('a'))

            .toEqual(false));


    // get

    it('get array',() =>
        expect(

            get([1, 2])(0))

            .toEqual(1));


    it('get nothing array',() =>
        expect(

            () => get([1, 2])(3))

            .toThrow(Error('get, got nothing')));


    it('get nothing object',() =>
        expect(

            () => get({a: {b: 4}})('c.d'))

            .toThrow(Error('get, got nothing')));
});
