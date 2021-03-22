import {shorterThan} from '../../../src/comparator'


/**
 * tsfun | shorterThan
 */
describe('shorterThan', () => {

    it('array', () =>
        expect(

            shorterThan([1, 6, 7])([7, 9])

        ).toEqual(true))
})
