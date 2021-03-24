import {Collection, Map} from '../../src/type'
import {lessThan} from '../../src/comparator'
import {filter, map} from '../../src/associative'
import { flow } from '../../src/composition'
import { expectType } from 'ts-expect'


/**
 * tsfun | filter
 */
describe('filter', () => {

    it('array', () => {

        expect(filter(lessThan(4))([2, 4, 3])).toEqual([2, 3])
        expect(filter(lessThan(4), [2, 4, 3])).toEqual([2, 3])
        expect(filter([2, 4, 3], lessThan(4))).toEqual([2, 3])
    })


    it('object', () => {

        expect(filter(lessThan(4))({a: 2, b: 4, c: 3})).toEqual({a: 2, c: 3})
        expect(filter(lessThan(4), {a: 2, b: 4, c: 3})).toEqual({a: 2, c: 3})
    })


    it('array i', () => {

        expect(

            filter((_, i: number) => i !== 1)([17, 19, 22]))

            .toEqual([17, 22])
    })


    it('object with k', () => {

        expect(

            filter((_, k: string) => k !== 'd')({d: 3, e: 4}))

            .toEqual({e: 4})
    })


    it('curry typing', () => {

        const $1 = [1, 2]
        const $2 = flow($1, filter(_ => true))
        expectType<Array<number>>($2)

        const $4 = {a:1, b: 2}
        const $5 = flow($4, filter(_ => true))
        expectType<Map<number>>($5)

        const $6 = {a:1, b: 2}
        const $7 = flow($6, filter((x: string) => true)) // number gets infered by $6, not by Predicate in this case
        expectType<Map<number>>($7)

        const $9 = {a:1, b: 2}
        const $10 = flow($9, filter(_ => true), map(_ => _ * 2))
        expectType<Map<number>>($10)
    })


    it('typing', () => {

        const result1: Collection = filter(_ => true)
        // const result: number = filter(_ => true)('a') // WRONG
        // const result: Collection = filter(_ => true)('a') as number // WRONG
        // const result: Collection = filter(_ => true) as number// WRONG
        // const result: number = filter(_ => true) // WRONG

        const result4: Array<number> = filter((a, b: number) => true, [1,2])
        const result5: Array<string> = filter((a, b: number) => true, ['a','b'])
        // const result: Array<number> = filter((a, b: string) => true, [1,2]) // WRONG
        const result6: Map = filter((a, b: string) => true, {a: 3, b: 4})
        // const result: Map = filter((a, b: number) => true, {a: 3, b: 4}) // WRONG
    })


    // old array tests

    it('multiple argument lists', () =>
        expect(

            filter(lessThan(4))([2, 4, 3])

        ).toEqual([2, 3])
    )


    it('to be used in composition', () =>
        expect(

            flow(
            [2, 4, 3]
            , filter(lessThan(4))
            )

        ).toEqual([2, 3])
    )


    it('index provided as second parameter', () => {

        expect(

            filter((_, i) => i !== 1)([17, 19, 22]))

            .toEqual([17, 22])
    })


    it('typing', () => {

        const result1 = filter(_ => true)
        // const result: number = filter(_ => true)('a') // WRONG
        // const result: number = filter(_ => true) // WRONG
    })
})
