import {to} from '../../src/struct';


describe('to', () => {

    // [{a: {b: {c: 'd'}}}].map(to('a.b'))
    // -> {c: 'd'}
    //
    // combined with map and filter
    //
    // [{a: {b: {c: 'd'}}}, {a: {c: {d: 'e'}}}]
    //     .map(to('a.c'))
    //     .filter(isDefined)
    // -> [{d: 'e'}]


    // to

    it('to', () =>
        expect(

            to('a.b')({a: {b: {c: 'd'}}}))

            .toEqual({c: 'd'}));


    it('to - by array', () =>
        expect(

            to(['a', 'b'])({a: {b: {c: 'd'}}}))

            .toEqual({c: 'd'}));


    it('to with map', () =>
        expect(

            [{a: {b: {c: 'd'}}}].map(to('a.b')))

            .toEqual([{c: 'd'}]));


    it('to - 1 does not exist', () =>
        expect(

            [{a: {b: {c: 'd'}}}, {a: {c: {d: 'e'}}}].map(to('a.c')))

            .toEqual([undefined, {d: 'e'}]));


    it('generic default type param', () =>
        expect(

            [{c: 'd'}, {c: 'e'}].map(to<string>('c')))

            .toEqual(['d', 'e']));
});