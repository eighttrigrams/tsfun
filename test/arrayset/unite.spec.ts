import {unite} from '../../src/arrayset';


/**
 * @author Daniel de Oliveira
 */
describe('unite', () => {


    it('unite',() =>
        expect(

            unite([1, 2])([2, 4]))

            .toEqual([1, 2, 4]));


    it('unite - variadic ',() =>
        expect(

            unite([1, 2], [3, 4])([2, 4]))

            .toEqual([1, 2, 3, 4]));


    it('unite - spread ',() =>
        expect(

            unite(...[[1, 2], [3, 4]])([2, 4]))

            .toEqual([1, 2, 3, 4]));
});
