import {includedIn} from "../../src/comparator";


/**
 * tsfun | includedIn
 *
 * @author Daniel de Oliveira
 */
describe('includedIn', () => {

    it('includedIn', () =>
        expect(

            includedIn([2, 5, 1])(1)

        ).toEqual(true));


    it('with filter', () =>
        expect(

            [1, 2, 7].filter(includedIn([2, 5, 1]))

        ).toEqual([1, 2]));


    it('string', () =>
        expect(

            includedIn('251')('1')

        ).toEqual(true));


    it('string', () =>
        expect(

            includedIn('251')('7')

        ).toEqual(false));


    it('allow only single elements to compare in this manner', () =>
        expect(

            () => includedIn('251')('25')

        ).toThrow());
});