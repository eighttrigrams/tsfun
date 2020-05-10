import {Map} from '../../src/type'
import {greaterThan, lessThan} from '../../src/comparator'
import {filter} from '../../src/collection'


/**
 * tsfun | filter
 *
 * It can be used in a flow context, where the arguments are given as separate argument lists,
 * as well as in a standard context, where the arguments are given in a single argument list.
 */
describe('filter', () => {

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

        const result1: string = filter((a, b: number) => true, 'a')
        // const result: string = filter((a, b: string) => true, 'a') // WRONG
        const result2: Array<number> = filter((a, b: number) => true, [1,2])
        const result3: Array<string> = filter((a, b: number) => true, ['a','b'])
        // const result: Array<number> = filter((a, b: string) => true, [1,2]) // WRONG
        const result4: Map = filter((a, b: string) => true, {a: 3, b: 4})
        // const result: Map = filter((a, b: number) => true, {a: 3, b: 4}) // WRONG
    })
})
