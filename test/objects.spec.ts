import {intoObject, mapOption, option, takeOrMake, to} from '../src/objects';
import {jsonEqual, on, tripleEqual} from '../src/comparators';
import {flow} from '../src/flow';
import {isEmpty} from '../src/predicates';

export function main() {

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
    describe('Objects', () => {


        // takeOrMake

        it('takeOrMake makes', () => {

            const obj: any = { };
            expect(takeOrMake(obj, 'a.b.c', [])).toEqual([]);
            expect(obj['a']['b']['c']).toEqual([]);
        });


        it('takeOrMake takes', () =>
            expect(

                takeOrMake({a:{ b: { c: 'a'}}}, 'a.b.c', []))

                .toEqual('a'));


        // option

        it('option', () =>
            expect(

                flow<any>({a:{b:{c: 4}}},
                    to('a.b'),
                    option(on('c:')(4)),
                    jsonEqual({c: 4})))

                .toEqual(true));


        it('to after failing option', () =>
            expect(

                flow<any>({a:{b:{c: 4}}},
                option(on('a.b.c:')(5)),
                to('c'),
                tripleEqual(4)))

                .toEqual(false));


        it('option isEmpty', () =>
            expect(

                flow<any>({a:{b:{c: 4}}},
                    option(on('c:')(5)),
                    isEmpty))

                .toEqual(true));


        // mapOption

        it('mapOption', () =>
            expect(

                flow<any>({a:{b:4}},
                    option(on('a.b:')(4)),
                    mapOption(to('a.b'))))

                .toEqual(4));


        it('mapOption on empty option', () =>
            expect(

                flow<any>({a:{b:4}},
                    option(on('a.b:')(5)),
                    mapOption((_: any) => _ + 2)))

                .toEqual({}));


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


        // intoObject

        it('intoObject', () =>
            expect(

                intoObject(_ => [_.key, _.val])
                    ({}, {key: 2, val: 7}))

                .toEqual({2: 7} as any));


        it('intoObject - with reduce', () =>
            expect(

                [{key: 2, val: 7}, {key: 3, val: 8}]
                    .reduce(intoObject(_ => [_.key, _.val]), {}))

                .toEqual({2: 7, 3: 8} as any));


        it('intoObject - missing key', () =>
            expect(

                [{key: 2, val: 7}, {val: 8}]
                    .reduce(intoObject(_ => [_.key, _.val]), {}))

                .toEqual({2: 7} as any));
    })
}