/**
 * @author Daniel de Oliveira
 */
import {includedIn} from "../../src/comparator";


describe('includedIn', () => {


    it('includedIn', () =>
        expect(

            includedIn([2, 5, 1])(1)

        ).toEqual(true));


    it('with filter', () =>
        expect(

            [1, 2, 7].filter(includedIn([2, 5, 1]))

        ).toEqual([1, 2]));
});