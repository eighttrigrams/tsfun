import {startsWith} from '../../../src/comparator';


/**
 * tsfun | startsWith
 *
 * Tests if the right hand side argument starts with the one given on the left hand side.
 *
 * startsWith operates on the List abstraction.
 * although here, the arguments must be both either of type string or Array,
 * and in the Array case both Array must contain the same type of arguments.
 *
 * It can be used in a flow context, where the arguments are given as separate argument lists,
 * as well as in a standard context, where the arguments are given in a single argument list.
 */
describe('startsWith', () => {

    it('string', () => {

        expect(startsWith('def')('def')).toBe(true)
        expect(startsWith('def', 'def')).toBe(true)
        expect(startsWith('def')('dae')).toBe(false)
        expect(startsWith('def', 'dae')).toBe(false)
    });


    it('array', () => {

        expect(startsWith([1, 2, 3])([1, 2, 3, 4])).toBe(true)
        expect(startsWith([1, 2, 3], [1, 2, 3, 4])).toBe(true)
        expect(startsWith(['a', 'b', 'c'])(['a', 'b', 'c'])).toBe(true)
        expect(startsWith(['a', 'b', 'c'], ['a', 'b', 'c'])).toBe(true)
    });


    it('array - false - too short', () =>

        expect(

            startsWith([1, 2, 3], [1, 2])

        ).toBe(false)
    );


    it('array - wrong', () =>

        expect(

            startsWith([1, 2], [3])

        ).toBe(false)
    );


    it('array - zero length', () =>

        expect(

            startsWith([], [])

        ).toBe(true)
    );


    it('typing', () => {

        const result1: boolean = startsWith('def')('def');
        const result2: boolean = startsWith('def', 'def');
        // WRONG - const result: boolean = startsWith('def'); - second parameter list expected, to give a boolean

        const result3: boolean = startsWith([1, 2])([1, 2]);
        const result4: boolean = startsWith([1, 2], [1, 2]);
        // WRONG - const result: boolean = startsWith([1, 2]); - second parameter list expected, to give a boolean

        // incompatible types
        // WRONG const result: boolean = startsWith([1, 2], 'abc');
        // WRONG const result: boolean = startsWith([1, 2])('abc');
        // WRONG const result: boolean = startsWith('abc', [1, 2]);
        // WRONG const result: boolean = startsWith('abc')([1, 2]);

        // incompatible array types
        // WRONG const result: boolean = startsWith([1, 2], ['a', 'b']);
    });
});