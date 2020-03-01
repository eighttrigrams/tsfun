/**
 * @author Daniel de Oliveira
 */
import {intersect} from "../../src/set";


describe('intersect', () => {


    it('intersect',() =>
        expect(

            intersect([1,2])([2,4]))

            .toEqual([2]));
});
