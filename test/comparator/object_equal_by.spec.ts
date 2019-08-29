import {arrayEqualBy, arrayEquivalent, objectEqual, objectEqualBy} from '../../src/comparator';

/**
 * objectEqual compares ObjectStructs, meaning deeply nested structures.
 *
 * The order of keys does not matter at any level, as far as other ObjectStructs
 * are found.
 *
 * On any level, if the type of a certain key on both
 * Objects is of a descendant of `Object`,
 * for instance `Date` or `Map`, the comparison is done via `jsonEqual`. Thus
 *
 * On any level, if the value is either a `string` or a `number`, the values
 * of the corresponding keys are compared via `===`, provided they are both of
 * the same type.
 *
 * @author Daniel de Oliveira
 */
describe('objectEqualBy', () => {


    // objectEqualBy is used to override the default behaviour of objectEqual
    // objectEqualBy produces a Comparator by feeding it an Array Comparator.
    // so that neither the order of the array elements nor the order of the keys does
    // matter in any way.
    // This works also when nesting Objects and Arrays deeply, like this

    it('make that order does not matter in array when nested', () =>
        expect(

            objectEqualBy(arrayEquivalent)
            ({a: [{b: 4, a: [2, 1]}, 2], c: 5})({c: 5, a: [2, {a: [1, 2], b: 4}]})

        ).toEqual(true));


    it('with arrayEquivalent', () =>
        expect(

            objectEqualBy(arrayEquivalent)
            ({a: [2, 1]})
            ({a: [1, 2]})

        ).toEqual(true));


    it('with arrayEquivalent nested', () =>
        expect(

            objectEqualBy(arrayEquivalent)
            ({a: [2, {a: 3, b: [3, 1]}]})
            ({a: [{a: 3, b: [1, 3]}, 2]})

        ).toEqual(true));


    it('object equivalent - order on keys and arrays does not matter', () =>
        expect(

            objectEqualBy(arrayEquivalent)
            ({a: [2, 1], b: 0})
            ({b: 0, a: [1, 2]})

        ).toEqual(true));


    it('object equivalent - use with arrayEquivalentBy', () =>
        expect(

            objectEqualBy(arrayEqualBy(objectEqual) as any)
            ({a: [{e: 5, c: 4}, 2], b: 0})
            ({b: 0, a: [{c: 4, e: 5}, 2]})

        ).toEqual(true));
});