/**
 * takeOrMake
 *
 * option
 *
 * mapOption
 *
 * to
 *
 * intoObject
 */
import {to} from '../../src/objects';


describe('to', () => {



    // to

    it('to', () =>
        expect(

            to('a.b')({a: {b: {c: 'd'}}}))

            .toEqual({c: 'd'}));


    it('to with map', () =>
        expect(

            [{a: {b: {c: 'd'}}}].map(to('a.b')))

            .toEqual([{c: 'd'}]));


    it('to - 1 does not exist', () =>
        expect(

            [{a: {b: {c: 'd'}}}, {a: {c: {d: 'e'}}}].map(to('a.c')))

            .toEqual([undefined, {d: 'e'}]));

});