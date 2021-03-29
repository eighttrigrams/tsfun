import {isNot, not} from '../../src/predicate'
import {tripleEqual} from '../../src/comparator'


describe('isNot', () => {


    it('isNot',() =>
        expect(

            isNot(tripleEqual('a'))('a'))

            .toEqual(false))

    it('not', () =>
        expect(

            not(tripleEqual('a'))('a'))

            .toEqual(false))
})
