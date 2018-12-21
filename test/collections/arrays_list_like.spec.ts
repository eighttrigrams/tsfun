import {append, filter, flatMap, map, prepend} from "../../src/collections/arrays_list_like";
import {flow} from "../../src/flow";
import {smallerThan} from "../../src/comparators";
import {getIth, getIthOr} from '../../src/arrays';
import {to} from '../../src/objects';


/**
 * getIth
 * getIthOr
 *
 * map
 * filter
 *
 * flatMap
 *
 * reverse
 *
 * prepend
 * append
 */
describe('Arrays/List-Like-Collection', () => {

    // getIth

    it('getIth', () =>

        expect(

            getIth([1, 3, 7])(2)

        ).toEqual(7));


    it('result undefined', () =>

        expect(

            getIth([1, 3, 7])(8)

        ).toEqual(undefined));


    it('with map', () =>

        expect(

            [0, 2].map(getIth([1, 3, 7]))

        ).toEqual([1, 7]));

    // getIthOr

    it('result undefined', () =>

        expect(

            getIthOr([1, 3, 7], 10)(8)

        ).toEqual(10));

    // map

    it('map', () =>
        expect(

            map((_: number) => 2 * _)([1, 2]))

            .toEqual([2, 4]));


    it('map - with to and flow', () =>
        expect(

            flow([{a: 1}, {a: 3}],
                map(to('a'))))

            .toEqual([1, 3]));

    // filter

    it('filter', () =>
        expect(

            flow([2, 4, 3],
                filter(smallerThan(4))))

            .toEqual([2, 3]));

    // flatMap

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

    // reverse

    // append

    it('append', () =>

        expect(

            append([1, 2])([3, 4]))

            .toEqual([3, 4, 1, 2]));

    // prepend

    it('append', () =>

        expect(

            prepend([1, 2])([3, 4]))

            .toEqual([1, 2, 3, 4]));
});
