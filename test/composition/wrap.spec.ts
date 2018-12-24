import {wrap} from '../../src/composition';
import {intersect} from '../../src/arrayset';
import {getOrElse} from '../../src/arraylist_objectstruct';
import {jsonClone} from '../../src/objectstruct';

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

            wrap(jsonClone)(getOrElse([1, 2]))
            (1))

            .toEqual(2));


    it('wrap with get',() =>
        expect(

            wrap(jsonClone)(intersect([1, 2]))
            ([2, 4]))

            .toEqual([2]));
});
