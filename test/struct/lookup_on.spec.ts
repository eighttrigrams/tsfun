import {lookupOn} from "../../src/struct";

/**
 * @author Daniel de Oliveira
 */
describe('lookupOn', () => {


    it('first level object - second level object',() =>
        expect(

            lookupOn({a: {b: 4}})('a.b'))

            .toEqual(4));


    it('first level object - second level array',() =>
        expect(

            lookupOn({a: [4, 5]})('a[1]'))

            .toEqual(5));


    it('fist level array - second level object',() =>
        expect(

            lookupOn([4, {d: 7}])('[1].d'))

            .toEqual(7));


    it('fist level array - second level array',() =>
        expect(

            lookupOn([4, [7, 8]])('[1][0]'))

            .toEqual(7));


    it('undefined as key',() =>
        expect(

            lookupOn([4, [7, 8]])(undefined as any))

            .toBeUndefined());


    it('nothing array', () =>
        expect(

            lookupOn([4])('[5]'))

            .toBeUndefined());


    it('nothing object',() =>
        expect(

            lookupOn({a: {b: 4}})('c.d'))

            .toBeUndefined());


    it('alternative',() =>
        expect(

            lookupOn([4], 7)('[5]'))

            .toEqual(7));
});
