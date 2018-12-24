import {getOrElse} from '../../src/arraylist_objectstruct';


/**
 * @author Daniel de Oliveira
 */
describe('get / getOrElse', () => {

    // Both Array and Map are associative

    // get

    it('get array',() =>
        expect(

            getOrElse([1, 2], undefined)(0))

            .toEqual(1));


    it('get array - undefined',() =>
        expect(

            getOrElse([1, 2], undefined)(3))

            .toEqual(undefined));


    it('get array - alternative',() =>
        expect(

            getOrElse([1, 2], 7)(3))

            .toEqual(7));


    it('get object',() =>
        expect(

            getOrElse({a: {b: 4}}, undefined)('a.b'))

            .toEqual(4));


    it('get object - undefined',() =>
        expect(

            getOrElse({a: {b: 4}}, undefined)('c.d'))

            .toEqual(undefined));


    it('get object - alternative',() =>
        expect(

            getOrElse({a: {b: 4}}, 8)('c.d'))

            .toEqual(8));


    it('wrap - with getElForPathIn and false',() =>
        expect(

            getOrElse({a: false}, undefined)('a'))

            .toEqual(false));
});
