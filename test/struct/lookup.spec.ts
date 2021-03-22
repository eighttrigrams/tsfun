import {lookup} from '../../src/struct'

/**
 * tsfun | lookup
 */
describe('lookup', () => {

    it('first level object - second level object',() =>
        expect(

            lookup({a: {b: 4}})(['a','b']))

            .toEqual(4))


    it('first level object - second level object - by array',() =>
        expect(

            lookup({a: {b: 4}})(['a', 'b']))

            .toEqual(4))


    it('first level object - second level array',() =>
        expect(

            lookup({a: [4, 5]})(['a', 1]))

            .toEqual(5))


    it('fist level array - second level object',() =>
        expect(

            lookup([4, {d: 7}])([1, 'd']))

            .toEqual(7))


    it('fist level array - second level array',() =>
        expect(

            lookup([4, [7, 8]])([1, 0]))

            .toEqual(7))


    it('undefined as key',() =>
        expect(() =>

            lookup([4, [7, 8]])(undefined as any))

            .toThrow())


    it('nothing array', () =>
        expect(

            lookup([4])(5))

            .toBeUndefined())


    it('nothing object', () =>
        expect(

            lookup({a: {b: 4}})(['c', 'd']))

            .toBeUndefined())


    it('alternative', () =>
        expect(

            lookup([4], 7)(5))

            .toEqual(7))


    it('first level object - second level object - see path', () =>
        expect(

            lookup({'a.b': 4})('a.b'))

            .toEqual(4))


    it('do not return undefined except when specified', () => {

        expect(lookup([0])(0)).toBe(0)
        expect(lookup([''])(0)).toBe('')
        expect(lookup([false])(0)).toBe(false)
        expect(lookup([null])(0)).toBe(null)
        expect(lookup([undefined])(0)).toBe(undefined)

        expect(lookup([[0]])([0,0])).toBe(0)
        expect(lookup([['']])([0,0])).toBe('')
        expect(lookup([[false]])([0,0])).toBe(false)
        expect(lookup([[null]])([0,0])).toBe(null)
        expect(lookup([[undefined]])([0,0])).toBe(undefined)
    })
})
