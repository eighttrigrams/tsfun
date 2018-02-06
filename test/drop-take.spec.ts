import {drop, dropWhile, take, takeRightWhile, takeUntil, takeWhile, dropRight} from '../src/drop-take';
import {smaller, bigger} from '../src/base';


/**
 * @author Daniel de Oliveira
 */
export function main() {

    describe('ListUtil/DropTake --', () => {

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


        it('take - 5', () =>

            expect(

                take(5)
                    ([1,2,7,7,8,9,11])

            ).toEqual([1,2,7,7,8])
        );


        it('take - 0', () =>

            expect(

                take(0)
                    ([1, 2, 7, 7, 8, 9, 11])

            ).toEqual([])
        );


        it('take - more', () =>

            expect(

                take(3)
                    ([1, 2])

            ).toEqual([1, 2])
        );


        it('take - from empty', () =>

            expect(

                take(3)
                    ([])

            ).toEqual([])
        );


        it('take - negative n', () =>

            expect(

                take(-1)
                    ([1, 2])

            ).toEqual([])
        );


        it('takeWhile - take five', () =>

            expect(

                takeWhile(smaller(20))
                    ([7, 9, 10, 13, 17, 20])

            ).toEqual([7, 9, 10, 13, 17])
        );


        it('takeWhile - take none', () =>

            expect(

                takeWhile(bigger(23))
                    ([7, 9, 10, 13, 17, 20])

            ).toEqual([])
        );


        it('takeWhile - take all', () =>

            expect(

                takeWhile(bigger(1))
                ([7, 9])

            ).toEqual([7, 9])
        );


        it('takeWhile - empty', () =>

            expect(takeWhile(bigger(23))
                ([])).toEqual([])
        );


        it('takeRightWhile - take five', () =>

            expect(

                takeRightWhile(bigger(13))
                    ([7, 9, 10, 13, 17, 20])

            ).toEqual([17, 20])
        );


        it('takeRightWhile - take none', () =>

            expect(

                takeRightWhile(bigger(23))
                    ([7, 9, 10, 13, 17, 20])

            ).toEqual([])
        );


        it('takeRightWhile - take all', () =>

            expect(

                takeRightWhile(bigger(1))
                    ([7, 9])

            ).toEqual([7, 9])
        );


        it('takeRightWhile - empty', () =>

            expect(

                takeRightWhile(bigger(23))
                    ([])

            ).toEqual([])
        );


        it('takeUntil - take two', () => {

            expect(

                takeUntil(bigger(7))
                    ([7, 9, 11])

            ).toEqual([7, 9]);
        });


        it('takeUntil - take all', () =>

            expect(

                takeUntil(bigger(13))
                    ([7, 9, 11])

            ).toEqual([7, 9, 11])
        );


        it('takeUntil - empty', () =>

            expect(

                takeUntil(bigger(13))
                    ([])

            ).toEqual([])
        );


        it('dropWhile - drop five', () =>

            expect(

                dropWhile(smaller(20))
                    ([7, 9, 10, 13, 21, 20])

            ).toEqual([21, 20])
        );


        it('dropWhile - drop none', () =>

            expect(

                dropWhile(smaller(5))
                    ([7, 9, 10, 13, 21, 20])

            ).toEqual([7, 9, 10, 13, 21, 20])
        );


        it('dropWhile - empty', () =>

            expect(

                dropWhile(smaller(20))
                    ([])

            ).toEqual([])
        );
    });
}