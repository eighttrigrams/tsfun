import {union} from '../../src/set'
import {equal} from '../../src/comparator'


/**
 * tsfun | union
 */
describe('union', () => {

    it('union ',() =>
        expect(

            union([[1, 2],[3, 4],[2, 4]]))

            .toEqual([1, 2, 3, 4]))


    it('comparator', () => {

        expect(
            union<any>(equal, [[{a: 'a'}, {c: 'c'}], [{c: 'c'}, {d: 'd'}]])) // uncurried
            .toEqual([{a: 'a'}, {c: 'c'}, {d: 'd'}])

        expect(
            union<any>(equal)([[{a: 'a'}, {c: 'c'}], [{c: 'c'}, {d: 'd'}]])) // curried
            .toEqual([{a: 'a'}, {c: 'c'}, {d: 'd'}])
    })
})
