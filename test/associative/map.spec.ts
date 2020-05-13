import {map} from '../../src/associative';
import {to} from '../../src/struct';
import {flow, nop} from '../../src/composition';
import {Associative} from '../../src/type';


/**
 * tsfun | map
 *
 * Allows for mapping over Associative collections
 */
describe('map', () => {

    it('map', () => {

        // map works as expected
        expect(

            map(_ => 2 * _, [3, 7])

        ).toEqual([6, 14])

        // but here it works also for the Map type, abstracting over Associative
        expect(

            map(_ => 2 * _, {a: 3, b: 7})

        ).toEqual({a: 6, b: 14})
    });


    it('call variants', () => {

        // param order can be reversed, if one prefers
        expect(

            map([3, 7], _ => 2 * _)

        ).toEqual([6, 14])
        expect(

            map({a: 3, b: 7}, _ => 2 * _)

        ).toEqual({a: 6, b: 14})

        // param order reversal works in non composition contexts


        // in composition context, two parameter lists are used,
        // of which the first expects the mapping function
        expect(

            map
            (_ => 2 * _)
            ([3, 7])

        ).toEqual([6, 14])
        expect(

            map
            (_ => 2 * _)
            ({a: 3, b: 7})

        ).toEqual({a: 6, b: 14})
    })


    it('map - with to and flow', () => {

        expect(

            flow(
                [{a: 1}, {a: 3}],
                map(to('a'))
            )

        ).toEqual([1, 3])
    })


    it('indexed', () => {

        // indices are accessible on every item call
        expect(

            map((item: number, i: number) => item * i, [2, 3, 4]))

            .toEqual([0, 3, 8])

        // as well as keys in the Map case
        expect(

            map((item: string, key: string) => key + item, {a: '1', b: '2'}))

            .toEqual({a: 'a1', b: 'b2'})
    })


    it('illegal arguments', () => {

        expect(() => (map as any)([])).toThrow()
        expect(() => (map as any)([], [])).toThrow()
        expect(() => (map as any)(nop, nop)).toThrow()
        expect(() => (map as any)(nop)(nop)).toThrow()
        expect(() => (map as any)(nop, [], [])).toThrow()
    })


    it('typing', () => {

        const result1: Associative = map(_ => _.toString())([1])

        map(_ => _.toExponential(2), {a: 3})
        map(_ => _.toExponential(2), [3])

        // map(_ => _.toExponential(2), ['3']) // WRONG
        // map(_ => _.toExponential(2), {a: '3'}) // WRONG
        {() => map(_ => _.toExponential(2))({a: '3'})} // WRONG, but passes, no inference over multiple parameter lists
        // '3'.toExponential(2) // see this

        // map((_, k) => _ - k, {a: 3}) // WRONG, k is string
        map((_: number, k: string) => _ + k)({a: 3}) // param types have to be given explicitely, no inference over multiple parameter lists
        map((_, i) => _ - i, [3]) // i inferred correctly as number
        map((_: number, i: number) => _ - i)([3]) // although not with multiple parameter lists
    })
})
