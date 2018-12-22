import {jsonClone, wrap} from '../../src/core';
import {intersect} from '../../src/collections/arrays_set_like';
import {get} from '../../src/colls_struct';

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
