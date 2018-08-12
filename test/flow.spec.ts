import {compose, flow} from '../src/flow';
import {reverse} from '../src/collections/arrays_list_like';
import {take, takeWhile, dropWhile, drop, dropRight} from '../src/collections/arrays_list_like_pick';
import {biggerThan, smallerThan} from '../src/comparators';
import {uniteMap} from '../src/collections/maps_set_like';


export function main() {

    /**
     * compose
     *
     * flow
     */
    describe('Flow', () => {

        // compose

        it('compose', () =>
            expect(

                compose(uniteMap({c: 3}))({a: 1, b: 2}))

            .toEqual({a: 1, b: 2, c: 3}));


        it('compose', () =>
            expect(

                compose(take(1))([5, 6]))

                .toEqual([5]));


        it('compose nest', () =>
            expect(

                flow(
                    [5, 6, 8, 9],
                    compose(
                        drop(1),
                        dropRight(1),
                        compose(
                            dropRight(1)))))

                .toEqual([6]));

        // flow


        it('flow', () =>
            expect(

                flow([5,4],
                    takeWhile(biggerThan(4))))

            .toEqual([5]));


        it('flow - no steps', () =>
            expect(

                flow(
                    [5,6]))

            .toEqual([5,6]));


        it('reverse ', () =>
            expect(

                reverse([1, 3]))

            .toEqual(([3, 1])));


        it('dropWhile', () =>
            expect(

                flow(
                    [7, 9, 10, 13, 21, 20],
                    dropWhile(smallerThan(20)),
                    reverse))

                .toEqual([20, 21]));


        it('with objects', () =>
            expect(

                flow(
                    {a: 1, b: 2},
                    uniteMap({c: 3})))

                .toEqual({a: 1, b: 2, c: 3}));
    });
}

