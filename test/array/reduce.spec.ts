import {reduce} from '../../src/array'


/**
 * tsfun | reduce
 */
describe('reduce', () => {

    it('array', () =>
        expect(

            reduce((b: number, a: number) => b + a, 0)([1, 5, 6]))

            .toBe(12))
})
