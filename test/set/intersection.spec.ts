import {intersection} from '../../src/set'
import {equal} from '../../src/comparator'


/**
 * tsfun | intersection
 */
describe('intersection', () => {

    it('what remove duplicates',() =>
        expect(

            intersection([[1,2,2,3],[2,3,4,5]]))

            .toEqual([2,3]))


    it('intersection',() =>
        expect(

            intersection([[1,2],[2,3],[2,4]]))

            .toEqual([2]))


    it('no intersection',() =>
        expect(

            intersection([[1,2],[3,4],[5,6]]))

            .toEqual([]))


    it('no intersection where only partial intersection',() =>
        expect(

            intersection([[1,2],[2,3],[3,4]]))

            .toEqual([]))


    it('empty array',() =>
        expect(

            intersection([]))

            .toEqual([]))


    it('intersectionBy', () =>
        expect(

            intersection<any>(equal, [[{a: 'a'}, {c: 'c'}], [{c: 'c'}, {d: 'd'}]]))

            .toEqual([{c: 'c'}]))
})
