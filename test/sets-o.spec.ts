import {intersectO, subtractO, uniteO} from '../src/sets-o';


/**
 * @author Daniel de Oliveira
 */
export function main() {

    describe('Sets/Objects', () => {

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