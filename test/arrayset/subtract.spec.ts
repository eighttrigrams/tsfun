import {jsonEqual} from '../../src/comparator';
import {subtract, subtractBy} from '../../src/arrayset';


/**
 * @author Daniel de Oliveira
 */
describe('Arrays/Set-Like-Collection', () => {


    it('subtract', () =>
        expect(

            subtract([3, 4, 5])([1, 2, 3]))

            .toEqual([1, 2]));


    it('subtract - make unique', () =>
        expect(

            subtract([3, 4, 5])([1, 2, 3, 3, 4, 4, 1]))

            .toEqual([1, 2]));


    it('subtract - from empty list', () =>
        expect(

            subtract([3, 4, 5])([]))

            .toEqual([]));


    it('subtract - empty list', () =>
        expect(

            subtract<number>([])([1, 2, 3]))

            .toEqual([1, 2, 3]));


    it('subtract - no intersection', () =>

        expect(

            subtract([4, 5, 6])([1, 2, 3]))

            .toEqual([1, 2, 3]));


    it('subtract - no intersection, make unique', () =>
        expect(

            subtract([4, 5, 6])([1, 2, 3, 3, 2]))

            .toEqual([1, 2, 3]));


    it('subtract - variadic', () =>
        expect(

            subtract([1], [2, 4])([1, 2, 3, 3, 2, 4]))

            .toEqual([3]));


    it('subtract - spread', () =>
        expect(

            subtract(...[[2], [1, 4]])([1, 2, 3, 3, 2, 4]))

            .toEqual([3]));


    // subtractBy

    it('subtractBy', () =>
        expect(

            subtractBy(jsonEqual)<any>([{a: 'a'}])([{a: 'a'}, {c: 'c'}]))

            .toEqual([{c: 'c'}]));


    /**
     * y_max = 100000
     * -> ~25ms
     *
     * Should be in the order of magnitude of 10 to 100,
     */
    it('subtract performance', () => {

        const aas = [];

        for (let x = 0; x < 2; x ++) {
            const as = [];
            for (let y = 0; y < 100000; y++) {
                as.push((x + y).toString())
            }
            aas.push(as);
        }


        const begin = new Date();
        subtract(aas[0])(aas[1]);
        const elapsed = (new Date() as any) - (begin as any);
        if (elapsed > 100) fail();
    });
});
