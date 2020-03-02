import {intersect} from "../../src/set";

/**
 * @author Daniel de Oliveira
 */
describe('intersect', () => {

    it('intersect',() =>
        expect(

            intersect([1,2])([2,4]))

            .toEqual([2]));


    it('intersect',() =>
        expect(

            intersect('12')('24'))

            .toEqual('2'));
});
