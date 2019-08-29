import {arrayEquivalent, equalBy} from '../../src/comparator';


/**
 * @author Daniel de Oliveira
 */
describe('equalBy', () => {


    it('Object - recursive Object Array Nesting', () =>
        expect(

            equalBy(arrayEquivalent)
            ({a: [2, {b: 4, a: [1, {f: [1, 2], e: 7}]}], c: 5})
            ({c: 5, a: [2, {a: [1, {e: 7, f: [2, 1]}], b: 4}]})

        ).toEqual(true));


    it('Array - recursive Object Array Nesting', () =>
        expect(

            equalBy(arrayEquivalent)
            ([2, {b: 4, a: [1, {f: [2, 1], e: 7}]}])
            ([2, {a: [1, {e: 7, f: [1, 2]}], b: 4}])

        ).toEqual(true));
});