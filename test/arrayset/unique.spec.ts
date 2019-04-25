import {jsonEqual, on} from '../../src/comparator';
import {unique, uniqueBy} from '../../src/arrayset';


/**
 * @author Daniel de Oliveira
 */
describe('unique/uniqueBy', () => {


    // unique

    it('unique', () =>
        expect(

            unique([1, 1, 7, 8, 7, 1]))

            .toEqual([1, 7, 8]));


    it('unique - of none', () =>
        expect(

            unique([]))

            .toEqual([]));


    // uniqueBy

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
        unique(as);
        const elapsed = (new Date() as any) - (begin as any);
        if (elapsed > 100) fail();
    });
});
