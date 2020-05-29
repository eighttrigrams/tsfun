import {prepend} from '../../src/array'


/**
 * tsfun | list/prepend
 */
describe('listPrepend', () => {

    it('prepend', () =>

        expect(

            prepend(1, 2)([3, 4]))

            .toEqual([1, 2, 3, 4]))
})
