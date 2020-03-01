/**
 * @author Daniel de Oliveira
 */
import {intersection} from "../../src/set";


describe('intersection', () => {


    it('intersection - what remove duplicates',() =>
        expect(

            intersection([[1,2,2,3],[2,3,4,5]]))

            .toEqual([2,3]));


    it('intersection',() =>
        expect(

            intersection([[1,2],[2,3],[2,4]]))

            .toEqual([2]));


    it('intersect - no intersection',() =>
        expect(

            intersection([[1,2],[3,4],[5,6]]))

            .toEqual([]));


    it('intersect - no intersection where only partial intersection',() =>
        expect(

            intersection([[1,2],[2,3],[3,4]]))

            .toEqual([]));


    it('intersect - empty array',() =>
        expect(

            intersection([]))

            .toEqual([]));
});
