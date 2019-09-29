import {getOnOr} from "../../src/struct";

/**
 * @author Daniel de Oliveira
 */
describe('getOnOr', () => {


    it('first level object - second level object',() =>
        expect(

            getOnOr('a.b', undefined)({a: {b: 4}}))

            .toEqual(4));


    it('first level object - second level key missing',() =>
        expect(

            getOnOr('a.c', undefined)({a: {b: 4}}))

            .toEqual(undefined));


    it('first level object - second level object - third level key missing',() =>
        expect(

            getOnOr('a.c.e', undefined)({a: {c: {c: 7}}}))

            .toEqual(undefined));


    it('first level object key missing - second level object key missing - third level key missing',() =>
        expect(

            getOnOr('e.e.e', undefined)({c: {c: {c: 7}}}))

            .toEqual(undefined));


    it('getOnOr - undefined',() =>
        expect(

            getOnOr('c.d', undefined)({a: {b: 4}}))

            .toEqual(undefined));


    it('getOnOr - alternative',() =>
        expect(

            getOnOr('c.d', 8)({a: {b: 4}}))

            .toEqual(8));


    it('getOnOr - alternative',() =>
        expect(

            getOnOr('c.d', 8)({a: {b: 4}}))

            .toEqual(8));


    it('wrap - with getElForPathIn and false',() =>
        expect(

            getOnOr('a', undefined)({a: false}))

            .toEqual(false));
});
