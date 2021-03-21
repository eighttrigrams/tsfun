import {Collection, Map} from '../../../src/type'
import {lessThan} from '../../../src/comparator'
import {filter1} from '../../../src/associative'


/**
 * tsfun | filter1
 */
describe('filter1', () => {

    it('array', () => {

        expect(filter1(lessThan(4))([2, 4, 3])).toEqual([2, 3])
        expect(filter1(lessThan(4), [2, 4, 3])).toEqual([2, 3])
        expect(filter1([2, 4, 3], lessThan(4))).toEqual([2, 3])
    })


    it('object', () => {

        expect(filter1(lessThan(4))({a: 2, b: 4, c: 3})).toEqual({a: 2, c: 3})
        expect(filter1(lessThan(4), {a: 2, b: 4, c: 3})).toEqual({a: 2, c: 3})
    })


    it('array i', () => {

        expect(

            filter1((_, i: number) => i !== 1)([17, 19, 22]))

            .toEqual([17, 22])
    })


    it('object with k', () => {

        expect(

            filter1((_, k: string) => k !== 'd')({d: 3, e: 4}))

            .toEqual({e: 4})
    })


    it('typing', () => {

        const result1: Collection = filter1(_ => true)
        // const result: number = filter(_ => true)('a') // WRONG
        // const result: Collection = filter(_ => true)('a') as number // WRONG
        // const result: Collection = filter(_ => true) as number// WRONG
        // const result: number = filter(_ => true) // WRONG

        const result4: Array<number> = filter1((a, b: number) => true, [1,2])
        const result5: Array<string> = filter1((a, b: number) => true, ['a','b'])
        // const result: Array<number> = filter((a, b: string) => true, [1,2]) // WRONG
        const result6: Map = filter1((a, b: string) => true, {a: 3, b: 4})
        // const result: Map = filter((a, b: number) => true, {a: 3, b: 4}) // WRONG
    })
})
