import {getIth, getIthOr} from '../../src/arraylist';


/**
 * @author Daniel de Oliveira
 */
describe('getIth/getIthOr', () => {

    // getIth

    it('getIth', () =>

        expect(

            getIth([1, 3, 7])(2)

        ).toEqual(7));


    it('result undefined', () =>

        expect(

            getIth([1, 3, 7])(8)

        ).toEqual(undefined));


    it('with map', () =>

        expect(

            [0, 2].map(getIth([1, 3, 7]))

        ).toEqual([1, 7]));

    /**
     * getIthOr - provides a fallback value
     */

    it('result undefined', () =>

        expect(

            getIthOr([1, 3, 7], 10)(8)

        ).toEqual(10));
});
