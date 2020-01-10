import {intersectionBy} from "../../src/arrayset";
import {jsonEqual} from "../../src/comparator";


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


    /**
     * x_max = 30, y_max = 10000
     * -> ~25ms
     *
     * Should be in the order of magnitude of 10 to 100,
     */
    it('intersection performance', () => {

        const aas = [];

        for (let x = 0; x < 30; x ++) {
            const as = [];
            for (let y = 0; y < 10000; y++) {
                as.push((x + y).toString())
            }
            aas.push(as);
        }

        const begin = new Date();
        intersectionBy()(aas);
        const elapsed = (new Date() as any) - (begin as any);
        if (elapsed > 100) fail();
    });
});
