import { map } from '../../src/array'
import { flow } from '../../src/composition'
import {to} from '../../src/struct'
import { Expect } from '../../src/type'
import { expectType } from 'ts-expect'


/**
 * tsfun | to
 */
describe('to', () => {

    it('to', () => {

        // Tuple
        expect(
            to(0)([1,2]))
            .toEqual(1)

        // Interface
        expect(
            to('a')({ a: 1 }))
            .toEqual(1)

        // Struct
        expect(
            to(['a', 'b'])({a: {b: {c: 'd'}}}))
            .toEqual({c: 'd'})
    })


    it('alternative', () => {

        expect(
            to(3)([1, 2]))
            .toBeUndefined()

        expect(
            to(['c','d'], 8)({a: {b: 4}}))
            .toEqual(8)

        expect(
            to(['c', 'd'], undefined)({a: {b: 4}}))
            .toEqual(undefined)
    })


    it('use case', () =>
        expect(

            flow(
                [{a: {b: {c: 'd'}}}],
                map(
                    to(['a', 'b']))))

            .toEqual([{c: 'd'}]))


    it('typing', () => {

        const $1 = to('a')({a: 1, b: '3'})
        const $$1: Expect<typeof $1, unknown> = true

        const $2 = to(0)([0])
        const $$2: Expect<typeof $2, unknown> = true

        const $3 = to([0,0])([[0]])
        const $$3: Expect<typeof $3, unknown> = true

        const $4 = to('a', 3)({a: 1, b: '3'})
        expectType<number>($4)

        const $5 = to(0, 3)([0])
        expectType<number>($5)

        const $6 = to([0,0], 3)([[0]])
        expectType<number>($6)

        const $6b = to<undefined|number>([0,0], 3)([[0]])
        expectType<number|undefined>($6b)

        const $7 = to<number>('a')({a: 1, b: '3'})
        expectType<number>($7)

        const $8 = to<number>(0)([0])
        expectType<number>($8)

        const $9 = to<number>([0,0])([[0]])
        expectType<number>($9)

        const $10 = to<number>('a', 3)({a: 1, b: '3'})
        expectType<number>($10)

        const $11 = to<number>(0, 3)([0])
        expectType<number>($11)

        const $12 = to<number>([0,0], 3)([[0]])
        expectType<number>($12)
    })


    it('to - 1 does not exist', () =>
        expect(

            [{a: {b: {c: 'd'}}}, {a: {c: {d: 'e'}}}].map(to(['a','c'])))

            .toEqual([undefined, {d: 'e'}]))


    it('generic default type param', () =>
        expect(

            [{c: 'd'}, {c: 'e'}].map(to('c')))

            .toEqual(['d', 'e']))

    it('first level object - second level object - see path', () =>
        expect(

            to('a.b')({'a.b': 4}))

            .toEqual(4))

    it('first level object - second level key missing',() =>
        expect(

            to(['a','c'], undefined)({a: {b: 4}}))

            .toEqual(undefined))


    it('first level object - second level object - third level key missing',() =>
        expect(

            to(['a','c','e'], undefined)({a: {c: {c: 7}}}))

            .toEqual(undefined))


    it('first level object key missing - second level object key missing - third level key missing',() =>
        expect(

            to(['e','e','e'])({c: {c: {c: 7}}}))

            .toEqual(undefined))

    it('wrap - with getElForPathIn and false',() =>
        expect(

            to('a')({a: false}))

            .toEqual(false))


    it('do not return undefined except when specified',() => {

        expect(to(0)([0])).toBe(0)
        expect(to(0)([''])).toBe('')
        expect(to(0)([false])).toBe(false)
        expect(to(0)([null])).toBe(null)
        expect(to(0)([undefined])).toBe(undefined)

        expect(to([0,0])([[0]])).toBe(0)
        expect(to([0,0])([['']])).toBe('')
        expect(to([0,0])([[false]])).toBe(false)
        expect(to([0,0])([[null]])).toBe(null)
        expect(to([0,0])([[undefined]])).toBe(undefined)
    })


    it('first level object - second level object',() =>
    expect(

        to(['a','b'])({a: {b: 4}}))

        .toEqual(4))


    it('first level object - second level object - by array',() =>
        expect(

            to(['a','b'])({a: {b: 4}}))

            .toEqual(4))


    // [{a: {b: {c: 'd'}}}].map(to('a.b'))
    // -> {c: 'd'}
    //
    // combined with map and filter
    //
    // [{a: {b: {c: 'd'}}}, {a: {c: {d: 'e'}}}]
    //     .map(to('a.c'))
    //     .filter(isDefined)
    // -> [{d: 'e'}]


    // Regression prevention

    it('to - see path', () =>
        expect(

            to('a.b')({'a.b': {c: 'd'}}))

            .toEqual({c: 'd'}))
})
