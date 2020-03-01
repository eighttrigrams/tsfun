/**
 * @author Daniel de Oliveira
 */
import {set} from "../../src/set";


describe('set', () => {


    it('set', () =>
        expect(

            set([1, 1, 7, 8, 7, 1]))

            .toEqual([1, 7, 8]));


    it('set - of none', () =>
        expect(

            set([]))

            .toEqual([]));
});
