import {differentFromBy, jsonEqual} from '../../src/comparator';


/**
 * @author Daniel de Oliveira
 */
describe('differentFromBy', () => {


    it('differentFromBy', () =>
        expect(

            differentFromBy(jsonEqual)({a: {b: 2, c: 3}})({a: {b: 2, c: 3}})

        ).toEqual(false));
});