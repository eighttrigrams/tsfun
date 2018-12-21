import {arrayEqual, arrayEqualBy, jsonEqual} from '../../src/comparators';



describe('arrayEqual/arrayEqualBy', () => {


    // arrayEqual

    it('equal', () =>
        expect(

            arrayEqual([1, 2])([1, 2])

        ).toEqual(true));


    it('order does matter', () =>
        expect(

            arrayEqual([1, 2])([2, 1])

        ).toEqual(false));


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


    it('nested', () =>
        expect(

            arrayEqual([1, [2, [3, 4]]])([1, [2, [3, 4]]])

        ).toEqual(true));


    it('default method is objectEquivalent', () =>
        expect(

            arrayEqual([1, {b: 2, c: 3}])([1, {c: 3, b: 2}])

        ).toEqual(true));


    it('allow strings and numbers', () =>
        expect(

            arrayEqual([{a: 1}, 3, 't'])([{a: 1}, 3, 't'])

        ).toEqual(true));


    it('equal', () =>
        expect(

            arrayEqual([1, {b: 2, c: 3}])([1, {b: 2, c: 3}])

        ).toEqual(true));


    it('using objectEqual', () =>
        expect(

            arrayEqual([1, {c: [1, 2], b: 2}])([1, {b: 2, c: [1, 2]}])

        ).toEqual(true));


    it('using objectEqual order matters', () =>
        expect(

            arrayEqual([1, {c: [1, 2], b: 2}])([1, {b: 2, c: [2, 1]}])

        ).toEqual(false));


    // arrayEqualBy

    it('override objectEquivalent default', () =>
        expect(

            arrayEqualBy(jsonEqual)([1, {b: 2, c: 3}])([1, {c: 3, b: 2}])

        ).toEqual(false));
});