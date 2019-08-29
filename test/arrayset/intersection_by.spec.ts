import {jsonEqual} from '../../src/comparator';
import {intersectionBy} from '../../src/arrayset';


/**
 * intersect and intersection are fast if used without specifying a comparator
 *
 * @author Daniel de Oliveira
 */
describe('intersectionBy', () => {


    it('intersectionBy', () =>
        expect(

            intersectionBy(jsonEqual)<any>([[{a: 'a'}, {c: 'c'}], [{c: 'c'}, {d: 'd'}]]))

            .toEqual([{c: 'c'}]));
});
