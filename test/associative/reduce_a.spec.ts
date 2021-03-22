import {reduce_a} from '../../src/associative'


/**
 * tsfun | reduce_a
 */
describe('reduce_a', () => {

    it('array', () =>
        expect(

            reduce_a((b: number, a: number) => b + a, 0)([1, 5, 6]))

            .toBe(12))


    it('single param list', () =>
        expect(

            reduce_a((b: number, a: number) => b + a, 0, [1, 5, 6]))

            .toBe(12))


    it('single param list - variant', () =>
        expect(

            reduce_a([1, 5, 6], (b: number, a: number) => b + a, 0))

            .toBe(12))


    it('object', () =>
        expect(

            reduce_a((acc: string, b: string, k: string) => acc + b + k, '.')({a: '3', b: '7', c: '5'}))

            .toBe('.3a7b5c'))
})
