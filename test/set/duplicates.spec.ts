import {equal, on} from '../../src/comparator'
import {duplicates} from '../../src/set'


/**
 * tsfun | duplicates
 */
describe('duplicates', () => {

    it('list of number ', () =>
        expect(

            duplicates([3, 3, 1, 4, 3, 1])

        ).toEqual([3, 1]))


    it('list of string ', () =>
        expect(

            duplicates(['3', '3', '1', '4', '3', '1'])

        ).toEqual(['3', '1']))


    it('comparator ', () => {

        expect(
            equal(
                duplicates(on('a'), [{a: 3}, {a: 3}, {a: 1}, {a: 4}, {a: 3}, {a: 1}]), // uncurried
                [{a: 3}, {a: 1}])
        ).toBeTruthy()

        expect(
            equal(
                duplicates(on('a'))([{a: 3}, {a: 3}, {a: 1}, {a: 4}, {a: 3}, {a: 1}]), // curried
                [{a: 3}, {a: 1}])
        ).toBeTruthy();
    })
})
