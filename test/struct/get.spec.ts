import {get} from '../../src/struct'


/**
 * tsfun | struct/get
 */
describe('struct/get', () => {


    it('first level object - second level object',() =>
        expect(

            get('a.b', undefined)({a: {b: 4}}))

            .toEqual(4));


    it('first level object - second level object - by array',() =>
        expect(

            get(['a','b'], undefined)({a: {b: 4}}))

            .toEqual(4));


    it('first level object - second level key missing',() =>
        expect(

            get('a.c', undefined)({a: {b: 4}}))

            .toEqual(undefined));


    it('first level object - second level object - third level key missing',() =>
        expect(

            get('a.c.e', undefined)({a: {c: {c: 7}}}))

            .toEqual(undefined));


    it('first level object key missing - second level object key missing - third level key missing',() =>
        expect(

            get('e.e.e', undefined)({c: {c: {c: 7}}}))

            .toEqual(undefined));


    it('getOr - undefined',() =>
        expect(

            get('c.d', undefined)({a: {b: 4}}))

            .toEqual(undefined));


    it('get - alternative',() =>
        expect(

            get('c.d', 8)({a: {b: 4}}))

            .toEqual(8));

    it('wrap - with getElForPathIn and false',() =>
        expect(

            get('a', undefined)({a: false}))

            .toEqual(false));


    it('nothing',() =>
        expect(

            get('[3]')([1, 2]))

            .toBeUndefined());
});
