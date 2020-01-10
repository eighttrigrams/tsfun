/**
 * @author Daniel de Oliveira
 */
import {includedInBy, jsonEqual} from "../../src/comparator";


describe('includedInBy', () => {


    it('includedInBy', () =>
        expect(

            includedInBy(jsonEqual)<any>([{a: 1}, {a: 2}])({a: 1})

        ).toEqual(true));
});