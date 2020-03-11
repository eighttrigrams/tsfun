import {map as lMap, materialize} from '../../src/lazy';
import {greaterThan} from '../../src/comparator';


/**
 * tsfun | lazy/map
 *
 * @author Daniel de Oliveira
 */
describe('lazy/map', () => {

    it('map', () => expect(

        materialize(lMap((x: number) => x * x)([4, 2, 1]))

    ).toEqual([16, 4, 1]));
});