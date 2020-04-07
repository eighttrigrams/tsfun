/**
 * @author Daniel de Oliveira
 */
import {samesetBy, jsonEqual} from "../../../src/comparator";


describe('samesetBy', () => {


    it('samesetBy - equivalent in different order', () =>
        expect(

            samesetBy(jsonEqual)([{a: 9}, {c: 7}, {b: 4}])([{b: 4}, {a: 9}, {c: 7}])

        ).toEqual(true));


    it('samesetBy - different property value in same order', () =>
        expect(

            samesetBy(jsonEqual)([{a: 10}, {c: 7}, {b: 4}])([{a: 9}, {c: 7}, {b: 4}])

        ).toEqual(false));


    it('samesetBy - left list smaller', () =>
        expect(

            samesetBy(jsonEqual)([{c: 7}])([{c: 7}, {b: 4}])

        ).toEqual(false));


    it('samesetBy - right list smaller', () =>
        expect(

            samesetBy(jsonEqual)([{c: 7}, {b: 4}])([{c: 7}])

        ).toEqual(false));
});