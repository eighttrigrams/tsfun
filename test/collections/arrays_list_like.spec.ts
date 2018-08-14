import {filter, flatMap, map, mapTo} from "../../src/collections/arrays_list_like";
import {flow} from "../../src/flow";
import {smallerThan} from "../../src/comparators";
import {getAtIndex, getAtIndexOr} from '../../src/arrays';
import {to} from '../../src/objects';


export function main() {

    /**
     * getAtIndex
     * getAtIndexOr
     *
     * map
     * filter
     *
     * flatMap
     *
     * mapTo
     *
     * reverse
     */
    describe('Arrays/List-Like-Collection', () => {

        // getAtIndex

        it('getAtIndex', () =>

            expect(

                getAtIndex([1, 3, 7])(2)

            ).toEqual(7));


        it('result undefined', () =>

            expect(

                getAtIndex([1, 3, 7])(8)

            ).toEqual(undefined));


        it('with map', () =>

            expect(

                [0, 2].map(getAtIndex([1, 3, 7]))

            ).toEqual([1, 7]));

        // getAtIndexOr

        it('result undefined', () =>

            expect(

                getAtIndexOr([1, 3, 7], 10)(8)

            ).toEqual(10));

        // map

        // filter

        // flatMap

        // mapTo

        // reverse

        it('mapTo', () =>

            expect(

                mapTo('a.c', [{a: {b: {c: 'd'}}}, {a: {c: {d: 'e'}}}]))

                .toEqual([{d: 'e'}]));


        it('map', () =>
            expect(

                map((_: number) => 2 * _)([1, 2]))

                .toEqual([2, 4]));


        it('map - with to and flow', () =>
            expect(

                flow([{a: 1}, {a: 3}],
                    map(to('a'))))

                .toEqual([1, 3]));


        it('filter', () =>
            expect(

                flow([2, 4, 3],
                    filter(smallerThan(4))))

                .toEqual([2, 3]));


        it('flatMap', () =>
            expect(

                flatMap((x: string) => x.split(' '))(['a b', 'c d']))

                .toEqual(['a', 'b', 'c', 'd']));


        it('flatMap - empty', () =>
            expect(

                flatMap((x: string) => x.split(' '))([]))

                .toEqual([]));


        it('flatMap - one - two', () =>
            expect(

                flatMap((x: string) => x.split(' '))(['a b']))

                .toEqual(['a', 'b']));


        it('flatMap - one - one', () =>
            expect(

                flatMap((x: string) => x.split(' '))(['a']))

                .toEqual(['a']));
    });
}