/**
 * @author Daniel de Oliveira
 */
import {subtract, unite, intersect} from '../src/objects/sets';


export function main() {

    describe('Sets/Objects', () => {

        it('subtractO - subtract by array of numeric keys', () => {

            expect(

                subtract([1])({1: 3, 2: 4})

            ).toEqual({2: 4});
        });


        it('subtractO - subtract by array of string keys', () => {

            expect(

                subtract(['1'])({1: 3, 2: 4})

            ).toEqual({2: 4});
        });


        it('subtractO - subtract objects', () => {

            expect(

                subtract({1: 7})({1: 3, 2: 4})

            ).toEqual({2: 4});
        });


        it('subtractO - array for o', () => {

            expect(

                () => subtract({0: 7})([2, 4])

            ).toThrow(new TypeError('invalid argument'));
        });


        it('subtractO - retain instance', () => {

            const instance = { a: 'hey'  };

            expect(

                subtract({1: 7})({1: 3, 2: instance})['2']

            ).toBe(instance);
        });


        it('uniteO - overwrite', () => {

            expect(

                unite({1: 4})({1: 3, 2: 4})

            ).toEqual({1: 4, 2: 4});
        });


        it('uniteO - unite different', () => {

            expect(

                unite({1: 4})({2: 4})

            ).toEqual({1: 4, 2: 4});
        });


        it('uniteO - illegal first arg', () => {

            expect(

                () => unite([])({2: 4})

            ).toThrow(new TypeError('invalid argument'));
        });


        it('uniteO - illegal second arg', () => {

            expect(

                () => unite({1: 4})([])

            ).toThrow(new TypeError('invalid argument'));
        });


        it('uniteO - retain instance', () => {

            const instance = { a: 'hey'  };

            expect(

                unite({1: 4})({1: 3, 2: instance})[2]

            ).toBe(instance);
        });


        it('intersectO', () => {

            expect(

                intersect({1: 4})({1: 3, 2: 4})

            ).toEqual({1: 4});
        });


        it('intersectO - array', () => {

            expect(

                intersect([1])({1: 3, 2: 4})

            ).toEqual({1: 3});
        });


        it('intersectO - array for o', () => {

            expect(

                () => intersect({1: 3, 2: 4})([1])

            ).toThrow(new TypeError('invalid argument'));
        });


        it('intersectO - retain instance', () => {

            const instance = { a: 'hey'  };

            expect(

                intersect({1: instance})({1: instance, 2: 4})[1]

            ).toBe(instance);
        });
    });
}