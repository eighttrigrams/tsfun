import {intersect, intersection, subtract, union, unite, unique, remove} from '../src/sets';


/**
 * @author Daniel de Oliveira
 */
export function main() {

    describe('Sets', () => {

        it('intersectWith',() =>

            expect(

                intersect([1,2])([2,4])

            ).toEqual([2])
        );


        it('intersect',() =>

            expect(

                intersection([[1,2],[2,3],[2,4]])

            ).toEqual([2])
        );


        it('intersect - no intersection',() =>

            expect(

                intersection([[1,2],[3,4],[5,6]])

            ).toEqual([])
        );


        it('intersect - no intersection where only partial intersection',() =>

            expect(

                intersection([[1,2],[2,3],[3,4]])

            ).toEqual([])
        );


        it('intersect - empty array',() =>

            expect(

                intersection([])

            ).toEqual([])
        );


        it('uniteWith',() =>

            expect(

                unite([1, 2])([2, 4])

            ).toEqual([1, 2, 4])
        );


        it('unite ',() =>

            expect(

                union([[1, 2],[3, 4],[2, 4]])

            ).toEqual([1, 2, 3, 4])
        );


        it('subtract', () =>

            expect(

                subtract([3, 4, 5])
                ([1, 2, 3])

            ).toEqual([1, 2])
        );


        it('subtract - make unique', () =>

            expect(

                subtract([3, 4, 5])
                ([1, 2, 3, 3, 4, 4, 1])

            ).toEqual([1, 2])
        );


        it('subtract - from empty list', () =>

            expect(

                subtract([3, 4, 5])
                ([])

            ).toEqual([])
        );


        it('subtract - empty list', () => {

            expect(

                subtract<number>([])
                ([1, 2, 3])

            ).toEqual([1, 2, 3]);
        });


        it('subtract - no intersection', () =>

            expect(

                subtract([4, 5, 6])
                ([1, 2, 3])

            ).toEqual([1, 2, 3])
        );


        it('subtract - no intersection, make unique', () =>

            expect(

                subtract([4, 5, 6])
                ([1, 2, 3, 3, 2])

            ).toEqual([1, 2, 3])
        );


        it('remove', () =>

            expect(

                remove(13)([1, 2, 13, 13, 4])


            ).toEqual([1, 2, 4])
        );


        it('remove - thereby make unique', () =>

            expect(

                remove(7)([1, 2, 7, 7, 4, 1])


            ).toEqual([1, 2, 4])
        );


        it('remove - nothing', () =>

            expect(

                remove(13)([1, 2, 7, 4])


            ).toEqual([1, 2, 7, 4])
        );


        it('remove - nothing, thereby make unique', () =>

            expect(

                remove(13)([1, 2, 7, 7, 4, 1])


            ).toEqual([1, 2, 7, 4])
        );


        it('remove - everything', () =>

            expect(

                remove(1)([1, 1])


            ).toEqual([])
        );


        it('unique', () =>

            expect(

                unique()([1, 1, 7, 8, 7, 1])

            ).toEqual([1, 7, 8])
        );


        it('unique - of none', () =>

            expect(

                unique()([])

            ).toEqual([])
        );


        // TODO implement
        /*
        it('unique - objects', () =>

            expect(

                unique('a')([{a: 1}, {a: 2}, {a: 1}])

            ).toEqual([{a: 1}, {a: 2}])
        );*/
    });
}