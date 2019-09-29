import {getOn} from "../../src/struct";

/**
 * @author Daniel de Oliveira
 */
describe('getOn', () => {

    it('nothing object',() =>
        expect(

            () => getOn({a: {b: 4}})('c.d'))

            .toThrow(Error('getOn, got nothing')));


    it('first level object - second level object',() =>
        expect(

            getOn({a: {b: 4}})('a.b'))

            .toEqual(4));


    it('fist level object - second level array',() =>
        expect(

            getOn({a: [4, 5]})('a[1]'))

            .toEqual(5));


    it('fist level array - second level object',() =>
        expect(

            getOn([4, {d: 7}])('[1].d'))

            .toEqual(7));


    it('fist level array - second level array',() =>
        expect(

            getOn([4, [7, 8]])('[1][0]'))

            .toEqual(7));


    it('a',() =>
        expect(

            () => getOn([4, [7, 8]])(undefined as any))

            .toThrow(Error('getOn, got nothing')));
});
