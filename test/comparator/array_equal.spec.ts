import {arrayEqual, arrayEqualBy, jsonEqual} from '../../src/comparator';


/**
 * @author Daniel de Oliveira
 */
describe('arrayEqual / arrayEqualBy', () => {

    // arrayEqual compares Arrays

    it('arrayEqual', () =>
        expect(

            arrayEqual([1, 2])([1, 2])

        ).toEqual(true));

    // and the order in which there are stored are equal. Thus

    it('order does matter', () =>
        expect(

            arrayEqual([1, 2])([2, 1])

        ).toEqual(false));

    // arrayEqual also works for nested structures
    // going deeper, embedded arrays getOn compared with arrayEqual again

    it('nested', () =>
        expect(

            arrayEqual([1, [2, [3, 4]]])([1, [2, [3, 4]]])

        ).toEqual(true));

    // the default object comparison method is objectEqual

    it('default method is objectEqual', () =>
        expect(

            arrayEqual([1, {b: 2, c: 3}])([1, {b: 2, c: 3}])

        ).toEqual(true));

    // this also means the order of keys does not matter

    it('objectEqual - order of keys does not matter', () =>
        expect(

            arrayEqual([1, {b: 2, c: 3}])([1, {c: 3, b: 2}])

        ).toEqual(true));

    // strings and numbers getOn compared with ===

    it('allow strings and numbers', () =>
        expect(

            arrayEqual([{a: 1}, 3, 't'])([{a: 1}, 3, 't'])

        ).toEqual(true));


    it('using objectEqual', () =>
        expect(

            arrayEqual([1, {c: [1, 2], b: 2}])([1, {b: 2, c: [1, 2]}])

        ).toEqual(true));


    it('using objectEqual order matters', () =>
        expect(

            arrayEqual([1, {c: [1, 2], b: 2}])([1, {b: 2, c: [2, 1]}])

        ).toEqual(false));


    // the default object comparison method can be overridden using the producer version

    it('override objectEquivalent default - key order matters', () =>
        expect(

            arrayEqualBy(jsonEqual)([1, {b: 2, c: 3}])([1, {c: 3, b: 2}])

        ).toEqual(false));


    // edge cases

    it('size does matter - first bigger (first elem equal)', () =>
        expect(

            arrayEqual
            ([1, 2])
            ([1])

        ).toEqual(false));


    it('size does matter - second bigger (first elem equal)', () =>
        expect(

            arrayEqual
            ([1])
            ([1, 2])

        ).toEqual(false));
});