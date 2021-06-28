import {isNot, not} from '../../src/predicate'
import {is} from '../../src/comparator'


describe('isNot', () => {


    it('isNot',() =>
        expect(

            isNot(is('a'))('a'))

            .toEqual(false))

    it('not', () =>
        expect(

            not(is('a'))('a'))

            .toEqual(false))
})
