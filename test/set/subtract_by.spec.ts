import {subtractBy} from "../../src/set";
import {jsonEqual} from "../../src/comparator";


/**
 * @author Daniel de Oliveira
 */
describe('subtractBy', () => {


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
        subtractBy()(aas[0])(aas[1]);
        const elapsed = (new Date() as any) - (begin as any);
        if (elapsed > 100) fail();
    });
});
