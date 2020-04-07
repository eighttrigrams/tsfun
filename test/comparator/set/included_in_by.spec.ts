import {includedInBy, jsonEqual} from "../../../src/comparator";


/**
 * tsfun | includedInBy
 *
 * @author Daniel de Oliveira
 */
describe('includedInBy', () => {

    it('includedInBy', () =>
        expect(

            includedInBy(jsonEqual)<any>([{a: 1}, {a: 2}])({a: 1})

        ).toEqual(true));
});