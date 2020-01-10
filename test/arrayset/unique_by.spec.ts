import {uniqueBy} from "../../src/arrayset";
import {jsonEqual, on} from "../../src/comparator";


/**
 * @author Daniel de Oliveira
 */
describe('uniqueBy', () => {


    it('uniqueBy with on', () =>
        expect(
            uniqueBy(on('a'))([{a: 1}, {a: 2}, {a: 1}])
        ).toEqual([{a: 1}, {a: 2}])
    );


    it('uniqueBy', () =>
        expect(

            uniqueBy(jsonEqual)([{a: 'c'}, {a: 'c'}]))

            .toEqual([{a: 'c'}]));


    /**
     * x_max = 100000
     * -> ~25ms
     *
     * Should be in the order of magnitude of 10 to 100,
     */
    it('unique performance', () => {

        const as = [];
        for (let x = 0; x < 100000; x++) {
            as.push(x.toString())
        }
        as.push(as);

        const begin = new Date();
        uniqueBy()(as);
        const elapsed = (new Date() as any) - (begin as any);
        if (elapsed > 100) fail();
    });
});
