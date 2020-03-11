import {includes} from "../../src/comparator";


/**
 * tsfun | includes
 *
 * @author Daniel de Oliveira
 */
describe('includes', () => {

    it('true', () =>
        expect(

            includes(1)([2, 5, 1])

        ).toEqual(true));


    it('false', () =>
        expect(

            includes(7)([2, 5, 1])

        ).toEqual(false));


    it('string - true', () =>
        expect(

            includes('a')('abc')

        ).toEqual(true));


    it('string - false', () =>
        expect(

            includes('d')('abc')

        ).toEqual(false));


    it('string - illegal argument - must be only one letter', () =>
        expect(

            () => includes('ab')('abc')

        ).toThrow());
});