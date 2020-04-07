/**
 * @author Daniel de Oliveira
 */
import {differentFrom} from "../../../src/comparator";


describe('differentFrom', () => {


    it('differentFrom', () =>
        expect(

            differentFrom({a: 1})({a: 1})

        ).toEqual(true));
});