import { expectType } from 'ts-expect'
import {take} from '../../src/array'
import {map} from '../../src/associative'
import { greaterThan } from '../../src/comparator'
import { flow } from '../../src/composition'


/**
 * tsfun | take
 */
describe('take', () => {

    it('5', () => {

        expect(take(5)([1, 2, 7, 7, 8, 9, 11])).toEqual([1, 2, 7, 7, 8])
        expect(take(5, [1, 2, 7, 7, 8, 9, 11])).toEqual([1, 2, 7, 7, 8])
    })


    it('try to take more than items available', () =>

        expect(

            take(3)
            ([1, 2])

        ).toEqual([1, 2])
    )


    it('filter', () => {

        expect(
            take(3, greaterThan(3), [1, 7, 9, 20, 3])
        ).toEqual([7, 9, 20])

        expect(
            take(3, greaterThan(3))([1, 7, 9, 20, 3])
        ).toEqual([7, 9, 20])

        expect(
            flow([1, 7, 9, 20, 3],
                take(3, greaterThan(3)),
                map(_ => _ * 2))
        ).toEqual([14, 18, 40])
    })


    it('edge cases', () => {

        expect(

            take(3)
            ([])

        ).toEqual([])

        expect(
            take(0)
            ([1, 2, 7, 7, 8, 9, 11])
        ).toEqual([])

        expect(

            take(-1)
            ([1, 2])

        ).toEqual([])
    })


    it('typing', () => {

        const $1: number[] = take(5)([1, 2, 7, 7, 8, 9, 11])
        expectType<Array<number>>($1)

        const $2: number[] = take(5, [1, 2, 7, 7, 8, 9, 11])
        expectType<Array<number>>($2)
    })


    it('filter - edge cases', () => {

        expect(
            take(0, greaterThan(3), [1, 7, 9, 20, 3])
        ).toEqual([])

        expect(
            take(4, greaterThan(3))([1, 7, 9, 20, 3])
        ).toEqual([7, 9, 20])

        expect(
            take(-1, greaterThan(3), [1, 7, 9, 20, 3])
        ).toEqual([])
    })
})
