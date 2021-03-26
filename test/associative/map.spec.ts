import {map} from '../../src/associative'
import {to} from '../../src/struct'
import {flow, nop, val} from '../../src/composition'
import {Map, Expect, Associative} from '../../src/type'
import { identity } from '../../src/core'
import { expectNever, expectType } from 'ts-expect'


/**
 * tsfun | map
 *
 * Allows for mapping over Arrays, Maps and Associatives
 */
describe('map_a', () => {

    it('map_a', () => {
        // map works as expected
        expect(
            map(_ => 2 * _, [3, 7])
        ).toEqual([6, 14])

        // it also works also for the Map type, abstracting over Associative
        expect(
            map(_ => 2 * _, {a: 3, b: 7})
        ).toEqual({a: 6, b: 14})
    })


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


    it('flexible curry typing', () => {

        function tk<T>(asc: Associative<T>) { return asc }

        const s: { a: number, b: string } = {a: 1, b: 'a'}
        const m: Map<number> = {a: 1, b: 2}
        const as: Array<number> = [1, 2]
        const asc1: Associative<number> = [1, 2]
        const asc2: Associative<number> = {a:1, b: 2}

        const $0 = map(identity)(s)
        expectType<Map<any>>($0)

        const $0a = map(identity)(m)
        expectType<Map<any>>($0a)

        const $0b = map(_ => _ as number)(m)
        expectType<Map<number>>($0b)

        const $1 = map(x => x * 2)(m)
        expectType<Map<number>>($1)
        const $2 = map((x: number) => x * 2)(m)
        expectType<Map<number>>($2)

        const $3 = map((x: number) => x * 2)(as)
        expectType<Array<number>>($3)
        const $4 = map(x => x * 2)(as)
        expectType<Array<any>>($4)

        const $6 = map((x: number) => x * 2)(asc1)
        expectType<Array<number>>($6)
        const $7 = map((x: number) => x * 2)(asc2)
        expectType<Map<number>>($7)

        const $9 = tk($0)

        const $19 = [{a:1},{a:2}]
        const $20 = map(({a: x}) => x * 2)($19)
        const $21: Expect<Array<number>,typeof $20> = true

        const $22 = map(_ => _.a)([{a: 1}, {a: 3}])
        const $23: Expect<Array<any>,typeof $22> = true

        const $26 = (_: any): number => _.a
        const $27 = map($26)
        const $28 = flow([{a: 1}, {a: 3}], $27)
        const $29: Expect<Array<number>,typeof $28> = true

        const $30 = (_: any): number => _.a
        const $31 = map($30)
        const $32 = flow({a: [1, 2], b: [3, 5]}, $31)
        const $33: Expect<Map<number>,typeof $32> = true
        const $34 = tk($32)

        const $35 = map((x: number) => x.toString())([1, 2])
        expectType<Array<string>>($35)

        const $36 = map((x: string) => 3)([1, 2])
        // const $38: undefined[] = $36 // Array<void>

        try {
            const $40 = map((x: number) => 3)(3)
            // never
        } catch {}
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


    // old array map tests TODO review, remove

    it('multiple parameter lists', () => {

        // in composition context, two parameter lists are used,
        // of which the first expects the mapping function
        expect(

            map
            (_ => 2 * _)
            ([3, 7])

        ).toEqual([6, 14])
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

            map((item: number, i: number) => item * i)([2, 3, 4]))

            .toEqual([0, 3, 8])
    })


    it('illegal arguments', () => {

        expect(() => (map as any)([])).toThrow()
        expect(() => (map as any)([], [])).toThrow()
        // expect(() => (map as any)(nop, nop)).toThrow() // TODO enable
        expect(() => (map as any)(nop)(nop)).toThrow()
        // expect(() => (map as any)(nop, [], [])).toThrow() // TODO enable
    })


    it('typing', () => {

        const result1: Associative = map(_ => _.toString())([1])

        // map(_ => _.toExponential(2), ['3']) // WRONG
        // map(_ => _.toExponential(2), {a: '3'}) // WRONG
        // '3'.toExponential(2) // see this

        // map((_, k) => _ - k, {a: 3}) // WRONG, k is string
        map((_: number, i: number) => _ - i)([3]) // although not with multiple parameter lists
    })
})
