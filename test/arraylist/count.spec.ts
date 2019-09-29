import {greaterThan} from "../../src/comparator";
import {count} from "../../src/arraylist";


describe('count', () => {


    it('demo', () =>
        expect(

            count(greaterThan(2))([3, 2, 7])

        ).toEqual(2));
});