import {map1} from '../../src/associative';
import {to} from '../../src/struct';
import {flow, nop} from '../../src/composition';
import {Associative} from '../../src/type';


/**
 * tsfun | map1
 *
 * Allows for mapping over Associative collections
 */
describe('map1', () => {

    it('map', () => {

        // map works as expected
        expect(

            map1(_ => 2 * _, [3, 7])

        ).toEqual([6, 14])

        // but here it works also for the Map type, abstracting over Associative
        expect(

            map1(_ => 2 * _, {a: 3, b: 7})

        ).toEqual({a: 6, b: 14})
    })


    it('call variants', () => {

        // param order can be reversed, if one prefers
        expect(

            map1([3, 7], _ => 2 * _)

        ).toEqual([6, 14])
        expect(

            map1({a: 3, b: 7}, _ => 2 * _)

        ).toEqual({a: 6, b: 14})

        // param order reversal works in non composition contexts


        // in composition context, two parameter lists are used,
        // of which the first expects the mapping function
        expect(

            map1
            (_ => 2 * _)
            ([3, 7])

        ).toEqual([6, 14])
        expect(

            map1
            (_ => 2 * _)
            ({a: 3, b: 7})

        ).toEqual({a: 6, b: 14})
    })


    it('map - with to and flow', () => {

        expect(

            flow(
                [{a: 1}, {a: 3}],
                map1(to('a'))
            )

        ).toEqual([1, 3])
    })


    it('indexed', () => {

        // indices are accessible on every item call
        expect(

            map1((item: number, i: number) => item * i, [2, 3, 4]))

            .toEqual([0, 3, 8])

        // as well as keys in the Map case
        expect(

            map1((item: string, key: string) => key + item, {a: '1', b: '2'}))

            .toEqual({a: 'a1', b: 'b2'})
    })


    it('illegal arguments', () => {

        expect(() => (map1 as any)([])).toThrow()
        expect(() => (map1 as any)([], [])).toThrow()
        expect(() => (map1 as any)(nop, nop)).toThrow()
        expect(() => (map1 as any)(nop)(nop)).toThrow()
        expect(() => (map1 as any)(nop, [], [])).toThrow()
    })


    it('typing', () => {

        const result1: Associative = map1(_ => _.toString())([1])

        map1(_ => _.toExponential(2), {a: 3})
        map1(_ => _.toExponential(2), [3])

        // map(_ => _.toExponential(2), ['3']) // WRONG
        // map(_ => _.toExponential(2), {a: '3'}) // WRONG
        {() => map1(_ => _.toExponential(2))({a: '3'})} // WRONG, but passes, no inference over multiple parameter lists
        // '3'.toExponential(2) // see this

        // map((_, k) => _ - k, {a: 3}) // WRONG, k is string
        map1((_: number, k: string) => _ + k)({a: 3}) // param types have to be given explicitely, no inference over multiple parameter lists
        map1((_, i) => _ - i, [3]) // i inferred correctly as number
        map1((_: number, i: number) => _ - i)([3]) // although not with multiple parameter lists
    })
})
