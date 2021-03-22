import {longerThan} from '../../../src/comparator'

/**
 * tsfun | longerThan
 */
describe('longerThan', () => {

    it('array', () =>
        expect(

            longerThan([1, 6])([7, 9, 10])

        ).toEqual(true))
})
