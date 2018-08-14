import {get, jsonClone, to, wrap} from '../src/core';
import {intersect} from '../src/collections/arrays_set_like';
import {getElForPathIn} from '../src/objects';

export function main() {

    /**
     * wrap
     *
     * get
     *
     * getElForPathIn
     */
    describe('Core', () => {

        it('wrap',() =>
            expect(

                wrap(jsonClone)(intersect([1, 2]))
                ([2, 4]))

                .toEqual([2]));


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
}