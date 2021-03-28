import {set} from '../../src/set'
import {equal, on} from '../../src/comparator'

/**
 * tsfun | set
 */
describe('set', () => {

    it('set', () =>
        expect(

            set([1, 1, 7, 8, 7, 1]))

            .toEqual([1, 7, 8]))


    it('of none', () =>
        expect(

            set([]))

            .toEqual([]))


    it('comparator with on', () =>
        expect(
            set(on('a'), [{a: 1}, {a: 2}, {a: 1}])
        ).toEqual([{a: 1}, {a: 2}])
    )


    it('comparator', () =>
        expect(

            set(equal, [{a: 'c'}, {a: 'c'}]))

            .toEqual([{a: 'c'}]))
})
