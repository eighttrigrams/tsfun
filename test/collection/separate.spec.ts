import {greaterThan, lessThan} from '../../src/comparator';
import {separate} from '../../src/collection';
import {Map, Pair} from '../../src/type';


describe('separate', () => {

    it('array', () => {

        expect(separate(lessThan(3))([2, 3, 1, 3, 4])).toEqual([[2, 1], [3, 3, 4]])
        expect(separate(lessThan(3), [2, 3, 1, 3, 4])).toEqual([[2, 1], [3, 3, 4]])
    })


    it('object', () =>

        expect(

            separate(lessThan(3))({a: 13, b: 1, c: -1, d: 19}))

            .toEqual([{b: 1, c: -1},{a: 13, d: 19}]))


    it('array - with i', () =>

        expect(

            separate((v: number, i: number) => i < 3)([2, 3, 1, 3, 4]))

            .toEqual([[2, 3, 1], [3, 4]]))


    it('object - with k', () =>

        expect(

            separate((v: number, k: string) => k === 'm')({d: 3, e: 4, m: 7}))

            .toEqual([{ m: 7 }, { d: 3, e: 4 }]))


    it('string', () =>

        expect(

            separate(greaterThan('b'))('abcde'))

            .toEqual(['cde', 'ab']))


    it('typing', () => {

        const result1: Pair<string> = separate((a, b: number) => true, 'a')
        // const result: Pair<string> = separate((a, b: string) => true, 'a') // WRONG
        const result2: Pair<Array<number>> = separate((a, b: number) => true, [1,2])
        const result3: Pair<Array<string>> = separate((a, b: number) => true, ['a','b'])
        // const result: Pair<Array<number>> = separate((a, b: string) => true, [1,2]) // WRONG
        const result4: Pair<Map> = separate((a, b: string) => true, {a: 3, b: 4})
        // const result: Pair<Map> = separate((a, b: number) => true, {a: 3, b: 4}) // WRONG
    })
})
