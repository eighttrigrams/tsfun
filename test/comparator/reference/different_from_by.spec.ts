/**
 * @author Daniel de Oliveira
 */
import {differentFromBy, jsonEqual} from "../../../src/comparator";


describe('differentFromBy', () => {


    it('differentFromBy', () =>
        expect(

            differentFromBy(jsonEqual)({a: {b: 2, c: 3}})({a: {b: 2, c: 3}})

        ).toEqual(false));
});