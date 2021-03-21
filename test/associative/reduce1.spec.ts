import {reduce1} from '../../src/associative'


/**
 * tsfun | reduce1
 */
describe('reduce1', () => {

    it('array', () =>
        expect(

            reduce1((b: number, a: number) => b + a, 0)([1, 5, 6]))

            .toBe(12))


    it('single param list', () =>
        expect(

            reduce1((b: number, a: number) => b + a, 0, [1, 5, 6]))

            .toBe(12))


    it('single param list - variant', () =>
        expect(

            reduce1([1, 5, 6], (b: number, a: number) => b + a, 0))

            .toBe(12))


    it('object', () =>
        expect(

            reduce1((acc: string, b: string, k: string) => acc + b + k, '.')({a: '3', b: '7', c: '5'}))

            .toBe('.3a7b5c'))
})
