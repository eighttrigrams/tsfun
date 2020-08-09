import {arrayEqualBy, objectEqual, objectEqualBy, samesetBy} from '../../../src/comparator';

/**
 * tsfun | objectEqual
 *
 * Compares Structs (mutually nested structures of [] and {})
 * The order of object keys does not matter at any level.
 * On any level
 * - if the value of a certain key on both
 *   objects is of a descendant of `Object`,
 *   for instance `Date` or `Map`, the comparison is done via `jsonEqual`. Thus
 * - if the value is either a `string` or a `number`, the values
 *   of the corresponding keys are compared via `===`, provided they are both of
 *   the same type.
 * - if the values are arrays, the comparison is done by arrayEqual
 *   (, which in turn uses objectEqual by default, for deeper nested {})
 */
describe('objectEqual', () => {

    it('order of keys does not matter', () =>
        expect(

            objectEqual({a: 1, b: 2})({b: 2, a: 1})

        ).toEqual(true))


    it('left side less keys', () =>
        expect(

            objectEqual({a: 1})({b: 2, a: 1})

        ).toEqual(false))


    it('right side less keys', () =>
        expect(

            objectEqual({a: 1, b: 2})({a: 1})

        ).toEqual(false))


    it('different keys', () =>
        expect(

            objectEqual({a: 1, b: 2})({a: 1, c:2})

        ).toEqual(false))


    it('different values', () =>
        expect(

            objectEqual({a: 1, b: 2})({a: 1, b: 3})

        ).toEqual(false))


    it('objectEqual - different values in different order', () =>
        expect(

            objectEqual({a: 1, b: 2})({b: 3, a: 1})

        ).toEqual(false))


    it('objectEqual - recursive, keys in different order', () =>
        expect(

            objectEqual({e: 0, a: {d: 2, c: 1}})({a: {c: 1, d: 2}, e: 0})

        ).toEqual(true))


    it('objectEqual - work with Date, equal', () =>
        expect(

            objectEqual({a: new Date(2018, 11, 24)})
            ({a: new Date(2018, 11, 24)})

        ).toEqual(true))


    it('objectEqual - work with Date, not equal', () =>
        expect(

            objectEqual({a: new Date(2018, 11, 24)})
            ({a: new Date(2018, 11, 25)})

        ).toEqual(false));

    // If the value of a certain key on both Objects is of type `Array`, the default
    // comparison is done with `arrayEqual`, which in turn uses `objectEqual`, such that
    //
    // objectEqual({a: [2, {a: 3, b: 4}]})({a: [2, {a: 3, b: 4}]})
    // -> true
    //
    // Also, the order of arrays matters by default, so
    //
    // objectEqual({a: [2, 1]})({a: [1, 2]})
    // -> false

    it('objectEqual - array compared with arrayEqual', () =>
        expect(

            objectEqual({a: [2, 1]})({a: [1, 2]})

        ).toEqual(false));


    it('objectEqual - mutual default nesting', () =>
        expect(

            objectEqual({a: [2, {a: 3, b: 4}]})({a: [2, {a: 3, b: 4}]})

        ).toEqual(true));


    it('objectEqual - mutual default nesting, order matters in arrays, but not for keys', () =>
        expect(

            objectEqual
            ({a: [2, {b: 4, a: [1, {f: [1, 2], e: 7}]}], c: 5})
            ({c: 5, a: [2, {a: [1, {e: 7, f: [1, 2]}], b: 4}]})

        ).toEqual(true));


    it('mutual default nesting, order matters in arrays!', () =>
        expect(

            objectEqual({a: [{b: 4, a: 3}, 2], c: 5})({c: 5, a: [2, {a: 3, b: 4}]})

        ).toEqual(false));


    // with comparator

    // objectEqualBy is used to override the default behaviour of objectEqual
    // objectEqualBy produces a Comparator by feeding it an Array Comparator.
    // so that neither the order of the array elements nor the order of the keys does
    // matter in any way.
    // This works also when nesting Objects and Arrays deeply, like this

    it('comparator - make that order does not matter in array when nested', () =>
        expect(

            objectEqual(samesetBy(undefined as any),
            {a: [{b: 4, a: [2, 1]}, 2], c: 5})({c: 5, a: [2, {a: [1, 2], b: 4}]})

        ).toEqual(true));


    it('comparator - with arrayEquivalent', () =>
        expect(

            objectEqual(samesetBy(undefined as any),
            {a: [2, 1]})
            ({a: [1, 2]})

        ).toEqual(true));


    it('comparator - with arrayEquivalent nested', () =>
        expect(

            objectEqual(samesetBy(undefined as any),
            {a: [2, {a: 3, b: [3, 1]}]})
            ({a: [{a: 3, b: [1, 3]}, 2]})

        ).toEqual(true));


    it('comparator - object equivalent - order on keys and arrays does not matter', () =>
        expect(

            objectEqual(samesetBy(undefined as any),
            {a: [2, 1], b: 0})
            ({b: 0, a: [1, 2]})

        ).toEqual(true));


    it('comparator - object equivalent - use with arrayEquivalentBy', () =>
        expect(

            objectEqual(arrayEqualBy(objectEqualBy(undefined as any)) as any,
            {a: [{e: 5, c: 4}, 2], b: 0})
            ({b: 0, a: [{c: 4, e: 5}, 2]})

        ).toEqual(true));
});