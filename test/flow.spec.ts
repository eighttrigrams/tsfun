import {flow, flowP} from '../src/flow';
import {reverse} from '../src/coll';
import {take, takeWhile} from '../src/take';
import {dropWhile} from '../src/drop';
import {biggerThan, smallerThan} from '../src/predicates';
import {intersection, union, unite} from '../src/sets';


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


        it('intersect',() =>

            expect(

                flow(
                    intersection([[1,2],[2,3]])
                )

            ).toEqual([2])
        );


        it('unite',() =>

            expect(

                flow(
                    [2,4],
                    unite([1,2])
                )

            ).toEqual([1, 2, 4])
        );


        it('union',() =>

            expect(
                flow(
                    union([[1,2],[3,4],[2,4]])
                )

            ).toEqual([1, 2, 3 ,4])
        );


        it('reverse', () =>

            expect(

                flow(
                    [1, 3],
                    reverse()
                )

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
    });
}