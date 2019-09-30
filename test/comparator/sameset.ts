import {sameset} from '../../src/comparator';


/**
 * @author Daniel de Oliveira
 */
describe('sameset', () => {

    // arraySetEqual compares two Arrays in a way that the order of the Arrays
    // does not matter.

    it('equivalent in different order', () =>
        expect(

            sameset([1, 4, 7])([7, 4, 1])

        ).toEqual(true));


    it('left side subset', () =>
        expect(

            sameset([1, 4])([7, 4, 1])

        ).toEqual(false));


    it('left list smaller but same set', () =>
        expect(

            sameset([1, 4])([1, 4, 1, 4, 1])

        ).toEqual(true));


    it('right list smaller', () =>
        expect(

            sameset([1, 4, 7])([7, 4])

        ).toEqual(false));


    it('right list smaller but same set', () =>
        expect(

            sameset([1, 4, 1, 4, 1])([1, 4])

        ).toEqual(true));


    it('different elements', () =>
        expect(

            sameset([1, 4, 5])([7, 4, 1])

        ).toEqual(false));

    // The same rules apply on nested structures

    it('nested arrays', () =>
        expect(

            sameset([1, [4, 7]])([[7, 4], 1])

        ).toEqual(true));


    it('nested arrays different sizes', () =>
        expect(

            sameset
            ([1, [7, [5, 5, 7], 7]])
            ([[7, 7, [5, 5, 7], [5, 5, 7]], 1])

        ).toEqual(true));


    // using the default comparator, the order of keys does not matter

    it('default comparator is objectEquivalentBy(arraySetEqual)', () =>
        expect(

            sameset
            ([{c: 7}, {c: 5, b: 4}])
            ([{b: 4, c: 5}, {c: 7}])

        ).toEqual(true));

    // at any level

    it('arraySetEqual with objectEquivalent - nest to arbitrary depth ', () =>
        expect(

            sameset
            ([{c: 7}, {c: [{g: [[1, 1, {m: 9, n: 10}], 8], d: 5}, 3], b: 4}])
            ([{b: 4, c: [3, {d: 5, g: [8, [1, {n: 10, m: 9}, 1]]}]}, {c: 7}])

        ).toEqual(true));
});