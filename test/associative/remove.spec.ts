import {greaterThan, lessThan} from '../../src/comparator';
import {remove} from '../../src/associative';
import {Map} from '../../src/type';
import { flow } from '../../src/composition';
import { expectNever, expectType } from 'ts-expect';


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
    })


    it('object', () => {

        expect(remove(lessThan(4))({a: 2, b: 4})).toEqual({b: 4})
        expect(remove(lessThan(4), {a: 2, b: 4})).toEqual({b: 4})
        expect(remove({a: 2, b: 4}, lessThan(4))).toEqual({b: 4})
    })


    it('object k', () => {

        expect(

            remove((_, k: string) => k === 'a')({a: 2, b: 4}))

            .toEqual({b: 4});
    })


    it('curry typing', () => {

        const $1 = [1, 2]
        const $2 = flow($1, remove((_: number) => true))
        expectType<Array<number>>($2)

        const $4 = {a:1, b: 2}
        const $5 = flow($4, remove((_: number) => true))
        expectType<Map<number>>($5)

        const $19 = {a:1, b: 2}
        const $21 = flow($19, remove(_ => true))
        expectType<Map<any>>($21)

        const $6 = [1, 2]
        const $7 = flow($6, remove((_: string) => true))
        const $8: void[] = $7
    })


    it('typing', () => {

        // const result1: string = remove((a, b: number) => true, 'a')
        // const result: string = remove((a, b: string) => true, 'a') // WRONG
        const result2: Array<number> = remove((a, b: number) => true, [1,2])
        const result3: Array<string> = remove((a, b: number) => true, ['a','b'])
        // const result: Array<number> = remove((a, b: string) => true, [1,2]) // WRONG
        // const result4: Map = remove((a, b: string) => true, {a: 3, b: 4})
        // const result: Map = remove((a, b: number) => true, {a: 3, b: 4}) // WRONG
    })
})
