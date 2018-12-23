import {differentFrom, differentFromBy, jsonEqual} from '../../src/comparator';


/**
 * @author Daniel de Oliveira
 */
describe('differentFrom/differentFromBy', () => {

    it('differentFrom', () =>
        expect(

            differentFrom({a: 1})({a: 1})

        ).toEqual(true));

    // differentFromBy

    it('differentFromBy', () =>
        expect(

            differentFromBy(jsonEqual)({a: {b: 2, c: 3}})({a: {b: 2, c: 3}})

        ).toEqual(false));
});