/**
 * @author Daniel de Oliveira
 */
import {jsonEqual} from '../../src/comparators';
import {union, unionBy, unite, uniteBy} from '../../src/arrayset';


describe('union/unite/unityBy', () => {

    // union

    it('union ',() =>
        expect(

            union([[1, 2],[3, 4],[2, 4]]))

            .toEqual([1, 2, 3, 4]));


    // unionBy

    it('unionBy', () =>
        expect(

            unionBy(jsonEqual)<any>([[{a: 'a'}, {c: 'c'}], [{c: 'c'}, {d: 'd'}]]))

            .toEqual([{a: 'a'}, {c: 'c'}, {d: 'd'}]));


    // unite

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


    // uniteBy

    it('uniteBy', () =>
        expect(

            uniteBy(jsonEqual)<any>([{a: 'a'}, {c: 'c'}])([{c: 'c'}, {d: 'd'}]))

            .toEqual([{a: 'a'}, {c: 'c'}, {d: 'd'}]));
});
