import {arrayEqualBy, jsonEqual} from '../../src/comparator';


/**
 * @author Daniel de Oliveira
 */
describe('arrayEqualBy', () => {

    // the default object comparison method can be overridden using the producer version

    it('override objectEquivalent default - key order matters', () =>
        expect(

            arrayEqualBy(jsonEqual)([1, {b: 2, c: 3}])([1, {c: 3, b: 2}])

        ).toEqual(false));
});