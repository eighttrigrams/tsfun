import { rest } from '../../src/array'


/**
 * tsfun | rest
 */
describe('rest', () => {

    it('rest', () =>
        expect(

            rest([4, 5])

        ).toEqual([5]))


    it('none', () =>
        expect(

            rest([5])

        ).toEqual([]))


    it('undefined', () =>
        expect(

            rest([])

        ).toEqual([]))
})
