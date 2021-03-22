import {longerThan} from '../../../src/comparator'

/**
 * tsfun | longerThan
 */
describe('longerThan', () => {

    it('string', () =>
       expect(

           longerThan('abc')('dddef')

       ).toEqual(true))


    it('array', () =>
        expect(

            longerThan([1, 6])([7, 9, 10])

        ).toEqual(true))


    it('string', () =>
        expect(

            longerThan([1, 6])('abc')

        ).toEqual(true))
})
