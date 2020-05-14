import {Collection, Map} from '../../src/type'
import {greaterThan, lessThan} from '../../src/comparator'
import {filter} from '../../src/collection'


/**
 * tsfun | collection/filter
 */
describe('collection/filter', () => {

    it('array', () => {

        expect(filter(lessThan(4))([2, 4, 3])).toEqual([2, 3])
        expect(filter(lessThan(4), [2, 4, 3])).toEqual([2, 3])
    })


    it('object', () => {

        expect(filter(lessThan(4))({a: 2, b: 4, c: 3})).toEqual({a: 2, c: 3})
        expect(filter(lessThan(4), {a: 2, b: 4, c: 3})).toEqual({a: 2, c: 3})
    })


    it('string', () => {

        expect(filter(greaterThan('d'))('ede')).toEqual('ee')
        expect(filter(greaterThan('d'), 'ede')).toEqual('ee')
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


    it('string with i', () => {

        expect(

            filter((_, i: number) => i !== 1)('ab'))

            .toEqual('a')
    })


    it('typing', () => {

        const result1: Collection = filter(_ => true)
        const result2: Collection = filter(_ => true)('a')
        // const result: number = filter(_ => true)('a') // WRONG
        // const result: Collection = filter(_ => true)('a') as number // WRONG
        // const result: Collection = filter(_ => true) as number// WRONG
        // const result: number = filter(_ => true) // WRONG

        const result3: string = filter((a, b: number) => true, 'a')
        // const result: string = filter((a, b: string) => true, 'a') // WRONG
        const result4: Array<number> = filter((a, b: number) => true, [1,2])
        const result5: Array<string> = filter((a, b: number) => true, ['a','b'])
        // const result: Array<number> = filter((a, b: string) => true, [1,2]) // WRONG
        const result6: Map = filter((a, b: string) => true, {a: 3, b: 4})
        // const result: Map = filter((a, b: number) => true, {a: 3, b: 4}) // WRONG
    })
})
