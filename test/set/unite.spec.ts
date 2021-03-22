import {unite} from '../../src/set'
import {jsonEqual} from '../../src/comparator'


/**
 * tsfun | unite
 */
describe('unite', () => {

    it('unite',() =>
        expect(

            unite([1, 2])([2, 4]))

            .toEqual([1, 2, 4]))


    it('string',() =>
        expect(

            unite('12')('24'))

            .toEqual('124'))


    it('comparator ', () =>
        expect(

            unite<any>(jsonEqual, [{a: 'a'}, {c: 'c'}])([{c: 'c'}, {d: 'd'}]))

            .toEqual([{a: 'a'}, {c: 'c'}, {d: 'd'}]))
})
