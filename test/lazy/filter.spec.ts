import {filter as lFilter, materialize} from '../../src/lazy';
import {greaterThan} from '../../src/comparator';


/**
 * tsfun | lazy/filter
 *
 * @author Daniel de Oliveira
 */
describe('lazy/filter', () => {

    it('filter', () => expect(

        materialize(lFilter(greaterThan(3))([4, 2, 1]))

    ).toEqual([4]));
});