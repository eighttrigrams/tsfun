import {getOn} from "../../src/struct";


/**
 * @author Daniel de Oliveira
 */
describe('getOn', () => {


    it('first level object - second level object',() =>
        expect(

            getOn('a.b', undefined)({a: {b: 4}}))

            .toEqual(4));


    it('first level object - second level key missing',() =>
        expect(

            getOn('a.c', undefined)({a: {b: 4}}))

            .toEqual(undefined));


    it('first level object - second level object - third level key missing',() =>
        expect(

            getOn('a.c.e', undefined)({a: {c: {c: 7}}}))

            .toEqual(undefined));


    it('first level object key missing - second level object key missing - third level key missing',() =>
        expect(

            getOn('e.e.e', undefined)({c: {c: {c: 7}}}))

            .toEqual(undefined));


    it('getOnOr - undefined',() =>
        expect(

            getOn('c.d', undefined)({a: {b: 4}}))

            .toEqual(undefined));


    it('getOn - alternative',() =>
        expect(

            getOn('c.d', 8)({a: {b: 4}}))

            .toEqual(8));

    it('wrap - with getElForPathIn and false',() =>
        expect(

            getOn('a', undefined)({a: false}))

            .toEqual(false));


    it('get nothing',() =>
        expect(

            () => getOn('[3]')([1, 2]))

            .toThrow(Error('got nothing')));
});
