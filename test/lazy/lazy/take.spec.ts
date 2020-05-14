import {take as lTake, filter as lFilter, materialize} from '../../../src/lazy';
import {flow} from '../../../src/composition';
import {greaterThan} from '../../../src/comparator';


/**
 * tsfun | lazy/take
 *
 * @author Daniel de Oliveira
 */
describe('lazy/take', () => {

    it('take', () => expect(

        materialize(lTake(1)([4, 2, 1]))

    ).toEqual([4]));


    it('use case', () => expect(

        flow(
            [2, 4, 2, 7, 1, 5],
            lFilter(greaterThan(2)),
            lTake(2),
            materialize)

    ).toEqual([4, 7]));
});