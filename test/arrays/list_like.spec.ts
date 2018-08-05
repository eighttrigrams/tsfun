import {flatMap, map, mapTo} from "../../src/arrays/list_like";
import {flow} from "../../src/flow";
import {to} from "../../src/objects/core";


/**
 * @author Daniel de Oliveira
 */
export function main() {

    describe('Arrays/Collection', () => {

        it('mapTo', () =>
            expect(mapTo('a.c', [{a: {b: {c: 'd'}}}, {a: {c: {d: 'e'}}}]))
                .toEqual([{d: 'e'}]));


        it('map', () =>
            expect(map((_: number) => 2 * _)([1, 2]))
                .toEqual([2, 4]));


        it('map - with to and flow', () =>
            expect(flow([{a: 1}, {a: 3}],
                    map(to('a'))))
                .toEqual([1, 3]));


        it('flatMap', () =>
            expect(flatMap((x: string) => x.split(' '))(['a b', 'c d']))
                .toEqual(['a', 'b', 'c', 'd']));


        it('flatMap - empty', () =>
            expect(flatMap((x: string) => x.split(' '))([]))
                .toEqual([]));


        it('flatMap - one - two', () =>
            expect(flatMap((x: string) => x.split(' '))(['a b']))
                .toEqual(['a', 'b']));


        it('flatMap - one - one', () =>
            expect(flatMap((x: string) => x.split(' '))(['a']))
                .toEqual(['a']));
    });
}