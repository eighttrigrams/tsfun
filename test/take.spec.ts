import {
    take, takeRightWhile, takeUntil, takeWhile, takeNth
} from '../src/arrays/list_like_take';
import {smallerThan, biggerThan} from '../src/comparators';


export function main() {

    describe('Take', () => {

        it('takeNth - 2', () =>

            expect(

                takeNth(2)([1,2,7,8,9,11])

            ).toEqual([1,7,9])
        );


        it('takeNth - 3', () =>

            expect(

                takeNth(3)([1, 2, 7, 8, 9, 11, 13, 14])

            ).toEqual([1, 8, 13])
        );


        it('takeNth - 7 of empty', () =>

            expect(

                takeNth(7)([])

            ).toEqual([])
        );


        it('takeNth - 0 of empty', () =>

            expect(

                takeNth(0)([])

            ).toEqual([])
        );


        it('takeNth - 2 of one item', () =>

            expect(

                takeNth(2)([1])

            ).toEqual([1])
        );


        it('takeNth - of negative', () =>

            expect(

                takeNth(-1)([1])

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

                takeWhile(smallerThan(20))
                    ([7, 9, 10, 13, 17, 20])

            ).toEqual([7, 9, 10, 13, 17])
        );


        it('takeWhile - take none', () =>

            expect(

                takeWhile(biggerThan(23))
                    ([7, 9, 10, 13, 17, 20])

            ).toEqual([])
        );


        it('takeWhile - take all', () =>

            expect(

                takeWhile(biggerThan(1))
                ([7, 9])

            ).toEqual([7, 9])
        );


        it('takeWhile - empty', () =>

            expect(takeWhile(biggerThan(23))
                ([])).toEqual([])
        );


        it('takeRightWhile - take five', () =>

            expect(

                takeRightWhile(biggerThan(13))
                    ([7, 9, 10, 13, 17, 20])

            ).toEqual([17, 20])
        );


        it('takeRightWhile - take none', () =>

            expect(

                takeRightWhile(biggerThan(23))
                    ([7, 9, 10, 13, 17, 20])

            ).toEqual([])
        );


        it('takeRightWhile - take all', () =>

            expect(

                takeRightWhile(biggerThan(1))
                    ([7, 9])

            ).toEqual([7, 9])
        );


        it('takeRightWhile - empty', () =>

            expect(

                takeRightWhile(biggerThan(23))
                    ([])

            ).toEqual([])
        );


        it('takeUntil - take two', () => {

            expect(

                takeUntil(biggerThan(7))
                    ([7, 9, 11])

            ).toEqual([7, 9]);
        });


        it('takeUntil - take all', () =>

            expect(

                takeUntil(biggerThan(13))
                    ([7, 9, 11])

            ).toEqual([7, 9, 11])
        );


        it('takeUntil - empty', () =>

            expect(

                takeUntil(biggerThan(13))
                    ([])

            ).toEqual([])
        );
    });
}