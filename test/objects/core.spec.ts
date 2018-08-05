import {filterObject, getElForPathIn, takeOrMake, to} from "../../src/objects/core";
import {equalTo, on, sameAs, sameOn} from "../../src/comparators";
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


        it('returns el', () =>
            expect(getElForPathIn({a:{ b: { c: 'a'}}}, 'a.b.c')).toEqual('a'));


        it('returns undefined', () =>
            expect(getElForPathIn({a:{ }}, 'a.b.c')).toEqual(undefined));


        it('takeOrMake makes', () => {

            const obj: any = { };
            expect(takeOrMake(obj, 'a.b.c', [])).toEqual([]);
            expect(obj['a']['b']['c']).toEqual([]);
        });


        it('takeOrMake takes', () =>
            expect(takeOrMake({a:{ b: { c: 'a'}}}, 'a.b.c', []))
                .toEqual('a'));


        it('flow to filterObject equalTo', () =>
            expect(flow<any>({a:{b:{c: 4}}},
                    to('a.b'),
                    filterObject(on('c:')(4)),
                    equalTo({c: 4})))
                .toEqual(true));


        it('flow to filterObject sameAs', () =>
            expect(flow<any>({a:{b:{c: 4}}},
                to('a.b'),
                filterObject(on('c:')(5)),
                to('c'),
                sameAs(4)))
                .toEqual(false));


        it('flow to filterObject isEmpty', () =>
            expect(flow<any>({a:{b:{c: 4}}},
                    to('a.b'),
                    filterObject(on('c:')(5)),
                    isEmpty))
                .toEqual(true));
    });
}