import {unionBy} from "../../src/arrayset";
import {jsonEqual} from "../../src/comparator";


/**
 * @author Daniel de Oliveira
 */
describe('unionBy', () => {


    it('unionBy', () =>
        expect(

            unionBy(jsonEqual)<any>([[{a: 'a'}, {c: 'c'}], [{c: 'c'}, {d: 'd'}]]))

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
        unionBy()(aas);
        const elapsed = (new Date() as any) - (begin as any);
        if (elapsed > 100) fail();
    });
});
