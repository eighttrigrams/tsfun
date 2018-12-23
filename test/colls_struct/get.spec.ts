import {get} from '../../src/arraylist_struct';

describe('get', () => {

    // Both Array and Map are associative

    // get

    it('get array',() =>
        expect(

            get([1, 2])(0))

            .toEqual(1));


    it('get array - undefined',() =>
        expect(

            get([1, 2])(3))

            .toEqual(undefined));


    it('get array - alternative',() =>
        expect(

            get([1, 2], 7)(3))

            .toEqual(7));


    it('get object',() =>
        expect(

            get({a: {b: 4}})('a.b'))

            .toEqual(4));


    it('get object - undefined',() =>
        expect(

            get({a: {b: 4}})('c.d'))

            .toEqual(undefined));


    it('get object - alternative',() =>
        expect(

            get({a: {b: 4}}, 8)('c.d'))

            .toEqual(8));


    it('wrap - with getElForPathIn and false',() =>
        expect(

            get({a: false})('a'))

            .toEqual(false));
});
