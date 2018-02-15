import {intersect, intersection, subtract, union, unite, unique, subtractO, uniteO, intersectO} from '../src/sets';


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


        it('subtractO - subtract by array of numeric keys', () => {

            expect(

                subtractO([1])({1: 3, 2: 4})

            ).toEqual({2: 4});
        });


        it('subtractO - subtract by array of string keys', () => {

            expect(

                subtractO(['1'])({1: 3, 2: 4})

            ).toEqual({2: 4});
        });


        it('subtractO - subtract objects', () => {

            expect(

                subtractO({1: 7})({1: 3, 2: 4})

            ).toEqual({2: 4});
        });


        it('subtractO - array for o', () => {

            expect(

                () => subtractO({0: 7})([2, 4])

            ).toThrow(new TypeError('invalid argument'));
        });


        it('subtractO - retain instance', () => {

            const instance = { a: 'hey'  };

            expect(

                subtractO({1: 7})({1: 3, 2: instance})['2']

            ).toBe(instance);
        });


        it('uniteO - overwrite', () => {

            expect(

                uniteO({1: 4})({1: 3, 2: 4})

            ).toEqual({1: 4, 2: 4});
        });


        it('uniteO - unite different', () => {

            expect(

                uniteO({1: 4})({2: 4})

            ).toEqual({1: 4, 2: 4});
        });


        it('uniteO - illegal first arg', () => {

            expect(

                () => uniteO([])({2: 4})

            ).toThrow(new TypeError('invalid argument'));
        });


        it('uniteO - illegal second arg', () => {

            expect(

                () => uniteO({1: 4})([])

            ).toThrow(new TypeError('invalid argument'));
        });


        it('uniteO - retain instance', () => {

            const instance = { a: 'hey'  };

            expect(

                uniteO({1: 4})({1: 3, 2: instance})[2]

            ).toBe(instance);
        });


        it('intersectO', () => {

            expect(

                intersectO({1: 4})({1: 3, 2: 4})

            ).toEqual({1: 4});
        });


        it('intersectO - array', () => {

            expect(

                intersectO([1])({1: 3, 2: 4})

            ).toEqual({1: 3});
        });


        it('intersectO - array for o', () => {

            expect(

                () => intersectO({1: 3, 2: 4})([1])

            ).toThrow(new TypeError('invalid argument'));
        });


        it('intersectO - retain instance', () => {

            const instance = { a: 'hey'  };

            expect(

                intersectO({1: instance})({1: instance, 2: 4})[1]

            ).toBe(instance);
        });
    });
}