import {sameLength} from '../../../src/comparator'


/**
 * tsfun | sameLength
 */
describe('sameLength', () => {

    it('string', () =>
        expect(

            sameLength('abc')('ddd')

        ).toEqual(true))


    it('array', () =>
        expect(

            sameLength([1, 6, 9])([7, 9, 10])

        ).toEqual(true))


    it('string', () =>
        expect(

            sameLength([1, 6])('ab')

        ).toEqual(true))
})
