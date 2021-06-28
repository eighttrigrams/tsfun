import {gt, lt} from '../../src/comparator';
import {separate} from '../../src/array';
import {Map, Pair} from '../../src/type';


/**
 * tsfun | separate
 */
describe('separate', () => {

    it('array', () => {

        expect(separate(lt(3))([2, 3, 1, 3, 4])).toEqual([[2, 1], [3, 3, 4]])
        expect(separate(lt(3), [2, 3, 1, 3, 4])).toEqual([[2, 1], [3, 3, 4]])
        expect(separate([2, 3, 1, 3, 4], lt(3))).toEqual([[2, 1], [3, 3, 4]])
    })


    it('array - with i', () =>

        expect(

            separate((v: number, i: number) => i < 3)([2, 3, 1, 3, 4]))

            .toEqual([[2, 3, 1], [3, 4]]))


    it('typing', () => {

        // const result1: Pair<string> = separate((a, b: number) => true, 'a')
        // const result: Pair<string> = separate((a, b: string) => true, 'a') // WRONG
        const result2: Pair<Array<number>> = separate((a, b: number) => true, [1,2])
        const result3: Pair<Array<string>> = separate((a, b: number) => true, ['a','b'])
        // const result: Pair<Array<number>> = separate((a, b: string) => true, [1,2]) // WRONG
        // const result4: Pair<Map> = separate((a, b: string) => true, {a: 3, b: 4})
        // const result: Pair<Map> = separate((a, b: number) => true, {a: 3, b: 4}) // WRONG
    })
})
