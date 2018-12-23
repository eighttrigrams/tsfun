import {equivalent} from '../../src/comparator';


/**
 * @author Daniel de Oliveira
 */
describe('equivalent', () => {


    // equivalent

    it('number', () =>
        expect(

            equivalent
            (1)
            (1)

        ).toEqual(true));


    it('strings equal', () =>
        expect(

            equivalent
            ("2s")
            ("2s")

        ).toEqual(true));


    it('strings not equal', () =>
        expect(

            equivalent
            ("2s")
            ("2st")

        ).toEqual(false));


    it('undefined', () =>
        expect(

            equivalent
            (undefined)
            (undefined)

        ).toEqual(true));


    it('recursive Object Array nesting', () =>
        expect(

            equivalent
            ({a: [2, {b: 4, a: [1, {f: [1, 2], e: 7}]}], c: 5})
            ({c: 5, a: [2, {a: [1, {e: 7, f: [2, 1, 1, 1]}], b: 4}]})

        ).toEqual(true));


    it('recursive Array Object nesting', () =>
        expect(

            equivalent
            ([2, {b: 4, a: [1, {f: [2, 1], e: 7}]}])
            ([2, {a: [1, {e: 7, f: [1, 2, 1, 1, 1]}], b: 4}])

        ).toEqual(true));
});