import {greaterThan, lessThan} from '../../src/comparator';
import {remove} from '../../src/array';
import {Map} from '../../src/type';


/**
 * tsfun | remove
 */
describe('remove', () => {

    it('array', () => {

        expect(remove(lessThan(4))([2, 4])).toEqual([4])
        expect(remove(lessThan(4), [2, 4])).toEqual([4])
        expect(remove([2, 4], lessThan(4))).toEqual([4])
    })


    it('array i', () => {

        expect(

            remove((_, i: number) => i === 1)([17, 19, 22]))

            .toEqual([17, 22]);
    });


    it('typing', () => {

        // const result1: string = remove((a, b: number) => true, 'a')
        // const result: string = remove((a, b: string) => true, 'a') // WRONG
        const result2: Array<number> = remove((a, b: number) => true, [1,2])
        const result3: Array<string> = remove((a, b: number) => true, ['a','b'])
        // const result: Array<number> = remove((a, b: string) => true, [1,2]) // WRONG
        // const result4: Map = remove((a, b: string) => true, {a: 3, b: 4})
        // const result: Map = remove((a, b: number) => true, {a: 3, b: 4}) // WRONG
    })
});
