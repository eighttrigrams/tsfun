import {wrap} from '../../src/composition';
import {intersect} from '../../src/arrayset';
import {jsonClone} from '../../src/objectstruct';
import {nthOr} from "../../src/arraylist";

describe('wrap - experimental', () => {

    // wrap

    // wrap(jsonClone)(intersect([1, 2]))([2, 4]))
    // -> [2] // cloned after intersect

    it('wrap',() =>
        expect(

            wrap(jsonClone)(intersect([1, 2]))
            ([2, 4]))

            .toEqual([2]));


    it('wrap getOn',() =>
        expect(

            wrap(jsonClone)(nthOr([1, 2], undefined))
            (1))

            .toEqual(2));


    it('wrap with getOn',() =>
        expect(

            wrap(jsonClone)(intersect([1, 2]))
            ([2, 4]))

            .toEqual([2]));
});
