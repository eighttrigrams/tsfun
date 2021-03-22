import {duplicates} from '../../src/set'


/**
 * tsfun | duplicates
 */
describe('duplicates', () => {

    it('list of number ', () =>
        expect(

            duplicates([3, 3, 1, 4, 3, 1])

        ).toEqual([3, 1]))


    it('list of string ', () =>
        expect(

            duplicates(['3', '3', '1', '4', '3', '1'])

        ).toEqual(['3', '1']))
})
