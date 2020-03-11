import {includesBy, on} from "../../src/comparator";


/**
 * tsfun | includesBy
 *
 * @author Daniel de Oliveira
 */
describe('includesBy', () => {

    it('includesBy', () =>
        expect(

            includesBy(on('a'))<any>({a: 1})([{a: 1}, {a: 2}])

        ).toEqual(true));
});