import {equal} from '../../src/comparator';


/**
 * @author Daniel de Oliveira
 */
describe('equal', () => {

    // equal

    it('equal - number', () =>
        expect(

            equal
            (1)
            (1)

        ).toEqual(true));


    it('strings equal', () =>
        expect(

            equal
            ("2s")
            ("2s")

        ).toEqual(true));


    it('strings not equal', () =>
        expect(

            equal
            ("2s")
            ("2st")

        ).toEqual(false));


    it('undefined', () =>
        expect(

            equal
            (undefined)
            (undefined)

        ).toEqual(true));


    it('Date true', () =>
        expect(

            equal
            (new Date(2018, 11))
            (new Date(2018, 11))

        ).toEqual(true));


    it('Date false', () =>
        expect(

            equal
            (new Date(2018, 11))
            (new Date(2018, 12))

        ).toEqual(false));


    it('equal - number vs string', () =>
        expect(

            equal
            (1)
            ("1")

        ).toEqual(false));


    it('equal - mutual default nesting, order matters in arrays, but not for keys', () =>
        expect(

            equal
            ({a: [2, {b: 4, a: [1, {f: [1, 2], e: 7}]}], c: 5})
            ({c: 5, a: [2, {a: [1, {e: 7, f: [1, 2]}], b: 4}]})

        ).toEqual(true));


    it('Array - recursive Object Array Nesting', () =>
        expect(

            equal
            ([2, {b: 4, a: [1, {f: [1, 2], e: 7}]}])
            ([2, {a: [1, {e: 7, f: [1, 2]}], b: 4}])

        ).toEqual(true));


    it('Array - recursive Object Array Nesting - Array order matters!', () =>
        expect(

            equal
            ([2, {b: 4, a: [1, {f: [2, 1], e: 7}]}])
            ([2, {a: [1, {e: 7, f: [1, 2]}], b: 4}])

        ).toEqual(false));
});