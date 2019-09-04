import {intersect} from '../../src/arrayset';


/**
 * intersect and intersection are fast if used without specifying a comparator
 *
 * @author Daniel de Oliveira
 */
describe('intersect', () => {


    it('intersect',() =>
        expect(

            intersect([1,2])([2,4]))

            .toEqual([2]));


    it('intersect - variadic',() =>
        expect(

            intersect([1,2],[2,5])([2,4]))

            .toEqual([2]));


    it('intersect - spread',() =>

        expect(

            intersect(...[[1,2],[2,5]])([2,4]))

            .toEqual([2]));
});
