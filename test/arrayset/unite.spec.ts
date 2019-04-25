import {jsonEqual} from '../../src/comparator';
import {union, unionBy, unite, uniteBy} from '../../src/arrayset';


/**
 * @author Daniel de Oliveira
 */
describe('union / unite / unityBy', () => {

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


    /**
     * x_max = 100, y_max = 10000
     * -> ~25ms
     *
     * Should be in the order of magnitude of 10 to 100,
     */
    it('union performance', () => {

        const aas = [];

        for (let x = 0; x < 100; x ++) {
            const as = [];
            for (let y = 0; y < 10000; y++) {
                as.push((x + y).toString())
            }
            aas.push(as);
        }

        const begin = new Date();
        union(aas);
        const elapsed = (new Date() as any) - (begin as any);
        if (elapsed > 100) fail();
    });
});
