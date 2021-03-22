import {map_a} from '../../src/associative'
import {to} from '../../src/struct'
import {flow, nop} from '../../src/composition'
import {Associative} from '../../src/type'


/**
 * tsfun | map_a
 *
 * Allows for mapping over Associative collections
 */
describe('map_a', () => {

    it('map_a', () => {

        // map works as expected
        expect(

            map_a(_ => 2 * _, [3, 7])

        ).toEqual([6, 14])

        // but here it works also for the Map type, abstracting over Associative
        expect(

            map_a(_ => 2 * _, {a: 3, b: 7})

        ).toEqual({a: 6, b: 14})
    })


    it('call variants', () => {

        // param order can be reversed, if one prefers
        expect(

            map_a([3, 7], _ => 2 * _)

        ).toEqual([6, 14])
        expect(

            map_a({a: 3, b: 7}, _ => 2 * _)

        ).toEqual({a: 6, b: 14})

        // param order reversal works in non composition contexts


        // in composition context, two parameter lists are used,
        // of which the first expects the mapping function
        expect(

            map_a
            (_ => 2 * _)
            ([3, 7])

        ).toEqual([6, 14])
        expect(

            map_a
            (_ => 2 * _)
            ({a: 3, b: 7})

        ).toEqual({a: 6, b: 14})
    })


    it('map - with to and flow', () => {

        expect(

            flow(
                [{a: 1}, {a: 3}],
                map_a(to('a'))
            )

        ).toEqual([1, 3])
    })


    it('indexed', () => {

        // indices are accessible on every item call
        expect(

            map_a((item: number, i: number) => item * i, [2, 3, 4]))

            .toEqual([0, 3, 8])

        // as well as keys in the Map case
        expect(

            map_a((item: string, key: string) => key + item, {a: '1', b: '2'}))

            .toEqual({a: 'a1', b: 'b2'})
    })


    it('illegal arguments', () => {

        expect(() => (map_a as any)([])).toThrow()
        expect(() => (map_a as any)([], [])).toThrow()
        expect(() => (map_a as any)(nop, nop)).toThrow()
        expect(() => (map_a as any)(nop)(nop)).toThrow()
        expect(() => (map_a as any)(nop, [], [])).toThrow()
    })


    it('typing', () => {

        const result1: Associative = map_a(_ => _.toString())([1])

        map_a(_ => _.toExponential(2), {a: 3})
        map_a(_ => _.toExponential(2), [3])

        // map(_ => _.toExponential(2), ['3']) // WRONG
        // map(_ => _.toExponential(2), {a: '3'}) // WRONG
        {() => map_a(_ => _.toExponential(2))({a: '3'})} // WRONG, but passes, no inference over multiple parameter lists
        // '3'.toExponential(2) // see this

        // map((_, k) => _ - k, {a: 3}) // WRONG, k is string
        map_a((_: number, k: string) => _ + k)({a: 3}) // param types have to be given explicitely, no inference over multiple parameter lists
        map_a((_, i) => _ - i, [3]) // i inferred correctly as number
        map_a((_: number, i: number) => _ - i)([3]) // although not with multiple parameter lists
    })
})
