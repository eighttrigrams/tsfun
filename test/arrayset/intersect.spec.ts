import {jsonEqual} from '../../src/comparator';
import {intersect, intersectBy, intersection, intersectionBy} from '../../src/arrayset';


/**
 * @author Daniel de Oliveira
 */
describe('intersection/intersect/intersectBy', () => {

    // intersection

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


    // intersectionBy

    it('intersectionBy', () =>
        expect(

            intersectionBy(jsonEqual)<any>([[{a: 'a'}, {c: 'c'}], [{c: 'c'}, {d: 'd'}]]))

            .toEqual([{c: 'c'}]));


    // intersect

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


    // intersectBy

    it('intersectBy', () =>
        expect(

            intersectBy(jsonEqual)<any>([{a: 'a'}, {c: 'c'}])([{c: 'c'}, {d: 'd'}]))

            .toEqual([{c: 'c'}]));
});
