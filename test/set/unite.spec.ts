import {unite} from '../../src/set'
import {equal} from '../../src/comparator'


/**
 * tsfun | unite
 */
describe('unite', () => {

    it('unite',() =>
        expect(

            unite([1, 2])([2, 4]))

            .toEqual([1, 2, 4]))


    it('comparator ', () =>
        expect(

            unite<any>(equal, [{a: 'a'}, {c: 'c'}])([{c: 'c'}, {d: 'd'}]))

            .toEqual([{a: 'a'}, {c: 'c'}, {d: 'd'}]))
})
