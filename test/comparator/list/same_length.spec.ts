import {sameLength} from '../../../src/comparator'


/**
 * tsfun | sameLength
 */
describe('sameLength', () => {

    it('array', () =>
        expect(

            sameLength([1, 6, 9])([7, 9, 10])

        ).toEqual(true))
})
