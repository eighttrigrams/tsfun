import {Collection} from '../../../src/type'
import {greaterThan} from '../../../src/comparator'
import {filter} from '../../../src/string'


/**
 * tsfun/string | filter
 */
describe('string/filter', () => {

    it('string', () => {

        expect(filter(greaterThan('d'))('ede')).toEqual('ee')
        expect(filter(greaterThan('d'), 'ede')).toEqual('ee')
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
        // const result: Array<number> = filter((a, b: string) => true, [1,2]) // WRONG
        // const result: Map = filter((a, b: number) => true, {a: 3, b: 4}) // WRONG
    })
})
