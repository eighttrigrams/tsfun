/**
 * @author Daniel de Oliveira
 */
import {unite} from "../../src/set";


describe('unite', () => {


    it('unite',() =>
        expect(

            unite([1, 2])([2, 4]))

            .toEqual([1, 2, 4]));
});
