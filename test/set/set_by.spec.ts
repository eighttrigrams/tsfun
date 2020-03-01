import {setBy} from "../../src/set";
import {jsonEqual, on} from "../../src/comparator";


/**
 * @author Daniel de Oliveira
 */
describe('setBy', () => {


    it('setBy with on', () =>
        expect(
            setBy(on('a'))([{a: 1}, {a: 2}, {a: 1}])
        ).toEqual([{a: 1}, {a: 2}])
    );


    it('setBy', () =>
        expect(

            setBy(jsonEqual)([{a: 'c'}, {a: 'c'}]))

            .toEqual([{a: 'c'}]));


    /**
     * x_max = 100000
     * -> ~25ms
     *
     * Should be in the order of magnitude of 10 to 100,
     */
    it('set performance', () => {

        const as = [];
        for (let x = 0; x < 100000; x++) {
            as.push(x.toString())
        }
        as.push(as);

        const begin = new Date();
        setBy()(as);
        const elapsed = (new Date() as any) - (begin as any);
        if (elapsed > 100) fail();
    });
});
