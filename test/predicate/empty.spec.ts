import {empty, isNot} from '../../src/predicate'


/**
 * tsfun | empty
 */
describe('empty', () => {

    it('a string - us with is not', () =>
        expect(

            isNot(empty)('1'))

            .toEqual(true))
})
