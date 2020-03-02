import {unite} from "../../src/set";

/**
 * @author Daniel de Oliveira
 */
describe('unite', () => {

    it('unite',() =>
        expect(

            unite([1, 2])([2, 4]))

            .toEqual([1, 2, 4]));


    it('string',() =>
        expect(

            unite('12')('24'))

            .toEqual('124'));
});
