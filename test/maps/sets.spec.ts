/**
 * @author Daniel de Oliveira
 */
import {subtract, unite, intersect, unionMap} from '../../src/maps/set_like';


export function main() {

    describe('Maps/Set-Like-Collection', () => {

        it('subtract - subtract by array of numeric keys', () => {

            expect(

                subtract([1])({1: 3, 2: 4})

            ).toEqual({2: 4});
        });


        it('subtract - subtract by array of string keys', () => {

            expect(

                subtract(['1'])({1: 3, 2: 4})

            ).toEqual({2: 4});
        });


        it('subtract - subtract objects', () => {

            expect(

                subtract({1: 7})({1: 3, 2: 4})

            ).toEqual({2: 4});
        });


        it('subtract - array for o', () => {

            expect(

                () => subtract({0: 7})([2, 4])

            ).toThrow(new TypeError('invalid argument'));
        });


        it('subtract - retain instance', () => {

            const instance = { a: 'hey'  };

            expect(

                subtract({1: 7})({1: 3, 2: instance})['2']

            ).toBe(instance);
        });


        it('unite - overwrite', () => {

            expect(

                unite({1: 4})({1: 3, 2: 4})

            ).toEqual({1: 4, 2: 4});
        });


        it('unite - unite different', () => {

            expect(

                unite({1: 4})({2: 4})

            ).toEqual({1: 4, 2: 4});
        });


        it('unite - illegal first arg', () => {

            expect(

                () => unite([])({2: 4})

            ).toThrow(new TypeError('invalid argument'));
        });


        it('unite - illegal second arg', () => {

            expect(

                () => unite({1: 4})([])

            ).toThrow(new TypeError('invalid argument'));
        });


        it('unite - retain instance', () => {

            const instance = { a: 'hey'  };

            expect(

                unite({1: 4})({1: 3, 2: instance})[2]

            ).toBe(instance);
        });


        it('unite - variadic', () =>

            expect(

                unite(...[{3: 4}, {4: 4}])({1: 2})

            ).toEqual({1: 2, 3: 4, 4: 4})
        );


        it('unite - variadic', () =>

            expect(

                unite(...[{3: 4}, {4: 4}])({1: 2})

            ).toEqual({1: 2, 3: 4, 4: 4})
        );


        it('union', () =>

            expect(

                unionMap([{3: 4}, {4: 4}, {1: 2}])

            ).toEqual({1: 2, 3: 4, 4: 4})
        );


        it('union - one', () =>

            expect(

                unionMap([{3: 4}])

            ).toEqual({3: 4})
        );


        it('union - empty', () =>

            expect(

                unionMap([])

            ).toEqual({})
        );


        it('intersect', () => {

            expect(

                intersect({1: 4})({1: 3, 2: 4})

            ).toEqual({1: 4});
        });


        it('intersect - array', () => {

            expect(

                intersect([1])({1: 3, 2: 4})

            ).toEqual({1: 3});
        });


        it('intersect - array for o', () => {

            expect(

                () => intersect({1: 3, 2: 4})([1])

            ).toThrow(new TypeError('invalid argument'));
        });


        it('intersect - retain instance', () => {

            const instance = { a: 'hey'  };

            expect(

                intersect({1: instance})({1: instance, 2: 4})[1]

            ).toBe(instance);
        });
    });
}