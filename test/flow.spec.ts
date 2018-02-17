import {flow, flowP} from '../src/flow';
import {reverse} from '../src/coll';
import {take, takeWhile} from '../src/take';
import {dropWhile} from '../src/drop';
import {biggerThan, smallerThan} from '../src/predicates';
import {intersection, union, unite} from '../src/sets';
import {uniteO} from '../src/sets-o';


/**
 * @author Daniel de Oliveira
 */
export function main() {

    describe('Flow', () => {

        it('flow', () =>

            expect(

                flow(
                    [5,4],
                    takeWhile(biggerThan(4))
                )
            ).toEqual([5])
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


        it('reverse ', () =>

            expect(

                reverse()([1, 3])

            ).toEqual(([3, 1]))
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


        it('with objects', () =>

            expect(

                flow(
                    {a: 1, b: 2},
                    uniteO({c: 3})
                )

            ).toEqual({a: 1, b: 2, c: 3})

        )
    });
}