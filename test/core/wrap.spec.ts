import {jsonClone} from '../../src/struct';
import {wrap} from '../../src/composition';
import {get} from '../../src/arraylist_struct';
import {intersect} from '../../src/arrayset';

describe('wrap', () => {

    // wrap

    // wrap(jsonClone)(intersect([1, 2]))([2, 4]))
    // -> [2] // cloned after intersect

    it('wrap',() =>
        expect(

            wrap(jsonClone)(intersect([1, 2]))
            ([2, 4]))

            .toEqual([2]));


    it('wrap get',() =>
        expect(

            wrap(jsonClone)(get([1, 2]))
            (1))

            .toEqual(2));


    it('wrap with get',() =>
        expect(

            wrap(jsonClone)(intersect([1, 2]))
            ([2, 4]))

            .toEqual([2]));
});
