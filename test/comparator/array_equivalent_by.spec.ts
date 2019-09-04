import {arrayEquivalentBy, jsonEqual} from '../../src/comparator';


/**
 * @author Daniel de Oliveira
 */
describe('arrayEquivalentBy', () => {


    it('arrayEquivalentBy - equivalent in different order', () =>
        expect(

            arrayEquivalentBy(jsonEqual)([{a: 9}, {c: 7}, {b: 4}])([{b: 4}, {a: 9}, {c: 7}])

        ).toEqual(true));


    it('arrayEquivalentBy - different property value in same order', () =>
        expect(

            arrayEquivalentBy(jsonEqual)([{a: 10}, {c: 7}, {b: 4}])([{a: 9}, {c: 7}, {b: 4}])

        ).toEqual(false));


    it('array equivalentBy - left list smaller', () =>
        expect(

            arrayEquivalentBy(jsonEqual)([{c: 7}])([{c: 7}, {b: 4}])

        ).toEqual(false));


    it('array equivalentBy - right list smaller', () =>
        expect(

            arrayEquivalentBy(jsonEqual)([{c: 7}, {b: 4}])([{c: 7}])

        ).toEqual(false));
});