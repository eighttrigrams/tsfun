import {split} from '../../src/string'


/**
 * tsfun/string | split
 */
describe('string/split', () => {

    it('split', () =>
        expect(

            split('')('abc')

        ).toEqual(['a', 'b', 'c']))
})
