import {getElForPathIn, mapOption, option, takeOrMake, to} from "../../src/objects/core";
import {jsonEqual, on, tripleEqual} from "../../src/comparators";
import {flow} from "../../src/flow";
import {isEmpty} from "../../src/coll";

/**
 * @author Daniel de Oliveira
 */
export function main() {

    describe('Objects', () => {


        it('to', () =>
           expect(to('a.b')({a: {b: {c: 'd'}}})).toEqual({c: 'd'}));


        it('to with map', () =>
            expect([{a: {b: {c: 'd'}}}].map(to('a.b'))).toEqual([{c: 'd'}]));


        it('to - 1 does not exist', () =>
            expect([{a: {b: {c: 'd'}}}, {a: {c: {d: 'e'}}}].map(to('a.c')))
                .toEqual([undefined, {d: 'e'}]));


        it('getElForPathIn - returns el', () =>
            expect(getElForPathIn({a:{ b: { c: 'a'}}}, 'a.b.c')).toEqual('a'));


        it('getElForPathIn - returns undefined', () =>
            expect(getElForPathIn({a:{ }}, 'a.b.c')).toEqual(undefined));


        it('getElForPathIn - does not return undfined on empty string', () =>
            expect(getElForPathIn({a: ''}, 'a')).not.toEqual(undefined));


        it('getElForPathIn - does not return undfined on 0', () =>
            expect(getElForPathIn({a: 0}, 'a')).not.toEqual(undefined));


        it('takeOrMake makes', () => {

            const obj: any = { };
            expect(takeOrMake(obj, 'a.b.c', [])).toEqual([]);
            expect(obj['a']['b']['c']).toEqual([]);
        });


        it('takeOrMake takes', () =>
            expect(takeOrMake({a:{ b: { c: 'a'}}}, 'a.b.c', []))
                .toEqual('a'));


        it('option', () =>
            expect(flow<any>({a:{b:{c: 4}}},
                    to('a.b'),
                    option(on('c:')(4)),
                    jsonEqual({c: 4})))
                .toEqual(true));


        it('to after failing option', () =>
            expect(flow<any>({a:{b:{c: 4}}},
                option(on('a.b.c:')(5)),
                to('c'),
                tripleEqual(4)))
                .toEqual(false));


        it('option isEmpty', () =>
            expect(flow<any>({a:{b:{c: 4}}},
                    option(on('c:')(5)),
                    isEmpty))
                .toEqual(true));


        it('mapOption', () =>
            expect(flow<any>({a:{b:4}},
                option(on('a.b:')(4)),
                mapOption(to('a.b'))))
                .toEqual(4));


        it('mapOption on empty option', () =>
            expect(flow<any>({a:{b:4}},
                option(on('a.b:')(5)),
                mapOption((_: any) => _ + 2)))
                .toEqual({}));
    })
}