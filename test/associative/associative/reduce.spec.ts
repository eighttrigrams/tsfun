import {reduce} from '../../../src/associative'


/**
 * tsfun/associative | reduce
 */
describe('reduce', () => {

    it('array', () =>
        expect(

            reduce((b: number, a: number) => b + a, 0)([1, 5, 6]))

            .toBe(12))


    it('single param list', () =>
        expect(

            reduce((b: number, a: number) => b + a, 0, [1, 5, 6]))

            .toBe(12))


    it('single param list - variant', () =>
        expect(

            reduce([1, 5, 6], (b: number, a: number) => b + a, 0))

            .toBe(12))


    it('object', () =>
        expect(

            reduce((acc: string, b: string, k: string) => acc + b + k, '.')({a: '3', b: '7', c: '5'}))

            .toBe('.3a7b5c'))
})
