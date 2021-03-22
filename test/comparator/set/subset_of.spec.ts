import {on, subsetOf} from '../../../src/comparator'


/**
 * tsfun | subsetOf
 */
describe('subsetOf', () => {

    it('subsetOf', () => {

        expect(subsetOf([3, 2, 7])([2, 7])).toEqual(true)
        expect(subsetOf([3, 2, 7], [2, 7])).toEqual(true)
    });


    it('not subsetOf', () =>
        expect(

            subsetOf([3, 2, 7])([2, 7, 1])

        ).toEqual(false));


    it('same set - subset - elements duplicated', () =>
        expect(

            subsetOf([3, 1, 2])([1, 1])

        ).toEqual(true));


    it('same set - same elements - different order', () =>
        expect(

            subsetOf([3, 3, 2, 2])([3, 2, 3, 2])

        ).toEqual(true));


    it('length does not matter', () =>
        expect(

            subsetOf([1])([1, 1, 1])

        ).toEqual(true))


    it('comparator', () =>
        expect(

            subsetOf(on('a'), [{a: 3}, {a: 4}], [{a: 4}])

        ).toEqual(true))


    it('comparator - 2 param lists', () =>
        expect(

            subsetOf(on('a'), [{a: 3}, {a: 4}])([{a: 4}])

        ).toEqual(true))
})
