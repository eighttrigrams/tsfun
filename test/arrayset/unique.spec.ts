/**
 * @author Daniel de Oliveira
 */
import {unique} from "../../src/arrayset";


describe('unique', () => {


    it('unique', () =>
        expect(

            unique([1, 1, 7, 8, 7, 1]))

            .toEqual([1, 7, 8]));


    it('unique - of none', () =>
        expect(

            unique([]))

            .toEqual([]));
});
