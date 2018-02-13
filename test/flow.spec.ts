import {filter, flow, map, reverse, reduce, flowP} from '../src/flow';
import {dropWhile, take, takeRightWhile, takeWhile} from '../src/drop-take';
import {biggerThan, differentFrom, includedIn, smallerThan} from '../src/predicates';
import {intersection, subtract, union, unite} from '../src/sets';


/**
 * @author Daniel de Oliveira
 */
export function main() {

    describe('Flow', () => {

        it('flow', () =>

            expect(

                flow(
                    [5,6,7,8,4,16,5],
                    takeWhile(biggerThan(4)),
                    map((x: number) => x * 2),
                    filter(smallerThan(16)),
                    filter(differentFrom(12)),
                    filter(includedIn([14]))
                )
            ).toEqual([14])
        );


        it('flow - no steps', () =>

            expect(

                flow(
                    [5,6]
                )

            ).toEqual([5,6])
        );


        it('flowP', () =>

            expect(

                flowP(
                    take(1)
                )([5, 6])

            ).toEqual([5])
        );


        it('flowP - nest', () =>

            expect(

                flow(
                    [5, 6],
                    flowP(
                        flowP(
                            take(1)
                        )
                    )
                )

            ).toEqual([5])
        );


        it('map', () =>

            expect(

                map((x: number) => x * 2)
                    ([2, 4])

            ).toEqual(([4, 8]))
        );


        it('filter', () =>

            expect(

                filter(smallerThan(4))
                    ([2, 4, 1, 5, 7, 8, 2, 1, 0])

            ).toEqual(([2, 1, 2, 1, 0]))
        );


        it('reverse ', () =>

            expect(

                reverse()([1, 3])

            ).toEqual(([3, 1]))
        );


        it('intersect',() =>

            expect(

                flow(
                    intersection([[1,2],[2,3]]),
                    map((x: number) => x * 2)
                )

            ).toEqual([4])
        );


        it('unite',() =>

            expect(

                flow(
                    [2,4],
                    unite([1,2]),
                    map((x: number) => x * 2)
                )

            ).toEqual([2,4,8])
        );


        it('union',() =>

            expect(
                flow(
                    union([[1,2],[3,4],[2,4]]),
                    map((x: number) => x * 2)
                )

            ).toEqual([2,4,6,8])
        );


        it('subtract',() =>

            expect(

                flow(
                    [1, 2, 3],
                    subtract([3, 4, 5]),
                    filter(smallerThan(2))
                )

            ).toEqual([1])
        );


        it('reverse', () =>

            expect(

                flow(
                    [1, 3],
                    reverse()
                )

            ).toEqual(([3, 1]))
        );


        it('reduce', () =>

            expect(

                flow(
                    [1, 3],
                    reduce(
                        (acc, val: number) => acc.concat([val * 2])
                    ),
                    reverse()
                )

            ).toEqual(([6, 2]))
        );



        it('takeWhile', () =>

            expect(

                flow(
                    [13, 17, 20],
                    takeWhile(smallerThan(20)),
                    filter(biggerThan(13))
                )

            ).toEqual([17])
        );


        it('takeRightWhile', () =>

            expect(

                flow(
                    [13, 22, 21],
                    takeRightWhile(biggerThan(20)),
                    filter(biggerThan(21))
                )

            ).toEqual([22])
        );


        it('dropWhile', () =>

            expect(

                flow(
                    [7, 9, 10, 13, 21, 20],
                    dropWhile(smallerThan(20)),
                    reverse()
                )

            ).toEqual([20, 21])
        );
    });
}