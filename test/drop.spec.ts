import {drop, dropWhile, dropRight, dropRightWhile} from '../src/drop';
import {smallerThan, biggerThan} from '../src/predicates';


/**
 * @author Daniel de Oliveira
 */
export function main() {

    describe('Drop', () => {

        it('drop - 2', () =>

            expect(

                drop(2)
                    ([8,9,11])

            ).toEqual([11])
        );


        it('drop - all', () =>

            expect(

                drop(5)
                    ([8,9,11])

            ).toEqual([])
        );


        it('drop - none', () =>

            expect(

                drop(0)
                    ([8, 9, 11])

            ).toEqual([8, 9, 11])
        );


        it('drop - 5 of empty', () =>

            expect(

                drop(5)
                    ([])

            ).toEqual([])
        );


        it('drop - 0 of empty', () =>

            expect(

                drop(0)
                    ([])

            ).toEqual([])
        );


        it('dropRight - 2', () =>

            expect(

                dropRight(2)
                    ([8,9,11])

            ).toEqual([8])
        );


        it('dropRight - all', () =>

            expect(

                dropRight(5)
                        ([8,9,11])

            ).toEqual([])
        );


        it('dropRight - none', () =>

            expect(

                dropRight(0)
                    ([8,9,11])

            ).toEqual([8, 9, 11])
        );


        it('dropRight - 2 of empty', () =>

            expect(

                dropRight(0)
                    ([])

            ).toEqual([])
        );


        it('dropRight - none of empty', () =>

            expect(

                dropRight(0)
                    ([])

            ).toEqual([])
        );


        it('dropWhile - drop five', () =>

            expect(

                dropWhile(smallerThan(20))
                    ([7, 9, 10, 13, 21, 20])

            ).toEqual([21, 20])
        );


        it('dropWhile - drop none', () =>

            expect(

                dropWhile(smallerThan(5))
                    ([7, 9, 10, 13, 21, 20])

            ).toEqual([7, 9, 10, 13, 21, 20])
        );


        it('dropWhile - empty', () =>

            expect(

                dropWhile(smallerThan(20))
                    ([])

            ).toEqual([])
        );


        it('dropRightWhile', () =>

            expect(

                dropRightWhile(biggerThan(19))
                    ([13, 21, 20])

            ).toEqual([13])
        );


        it('dropRightWhile - none', () =>

            expect(

                dropRightWhile(smallerThan(19))
                    ([13, 21, 20])

            ).toEqual([13, 21, 20])
        );


        it('dropRightWhile - all', () =>

            expect(

                dropRightWhile(biggerThan(1))
                ([13, 21, 20])

            ).toEqual([])
        );


        it('dropRightWhile - of empty', () =>

            expect(

                dropRightWhile(biggerThan(1))
                    ([])

            ).toEqual([])
        );
    });
}