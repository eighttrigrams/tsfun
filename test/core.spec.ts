import {get, getElForPathIn, jsonClone, wrap} from '../src/core';
import {intersect} from '../src/collections/arrays_set_like';

export function main() {

    /**
     * wrap
     *
     * get
     *
     * to
     *
     * getElForPathin
     */
    describe('Core', () => {

        // wrap

        it('wrap',() =>
            expect(

                wrap(jsonClone)(intersect([1, 2]))
                ([2, 4]))

                .toEqual([2]));


        it('wrap get',() =>
            expect(

                wrap(jsonClone)(get([1, 2]))
                (1))

                .toEqual(2));

        // get

        it('wrap with get',() =>
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


        it('wrap - with getElForPathIn and false',() =>
            expect(

                get({a: false})('a'))

                .toEqual(false));


        // getElForPathIn

        it('getElForPathIn - returns el', () =>
            expect(

                getElForPathIn({a:{ b: { c: 'a'}}}, 'a.b.c'))

                .toEqual('a'));


        it('getElForPathIn - returns undefined', () =>
            expect(

                getElForPathIn({a:{ }}, 'a.b.c'))

                .toEqual(undefined));


        it('getElForPathIn - does not return undefined on empty string', () =>
            expect(

                getElForPathIn({a: ''}, 'a'))

                .not.toEqual(undefined));


        it('getElForPathIn - does not return undfined on 0', () =>
            expect(

                getElForPathIn({a: 0}, 'a'))

                .not.toEqual(undefined));
    });
}