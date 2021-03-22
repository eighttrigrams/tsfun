import { map } from '../../src/array'
import {to_a} from '../../src/associative'
import { flow } from '../../src/composition'
import { expectType } from 'ts-expect'


/**
 * tsfun | to_a
 *
 * Like "tsfun|to", but with improved typing support
 * for homogeneous Map-s and Array-s.
 */
describe('to_a', () => {

    it('object',() =>
        expect(

            to_a('a')({a: 'b', c: 'd'}))

            .toEqual('b'))


    it('object - use case',() =>
        expect(
            flow(
                [{ a: 3}, { a: 4}],
                map(to_a('a'))))

                .toEqual([3, 4]))


    it('array',() =>
        expect(

            to_a(0)([1, 2]))

        .toEqual(1))


    it('typing', () => {

        const $1 = to_a(1)([8, 7])
        expectType<number|undefined>($1)

        const $2 = to_a('a')({ a: 7 })
        expectType<number|undefined>($2)

        const $3 = to_a(1, 9)([8, 7])
        expectType<number|undefined>($3)

        const $4 = to_a('a', 10)({ a: 7 })
        expectType<number|undefined>($4)

        const $5 = to_a<number>('a', undefined)({ a: 7 })
        expectType<number|undefined>($5)
    })


    it('nothing',() =>
        expect(

            to_a(3)([1, 2]))

            .toBeUndefined())


    it('alternative - from object',() =>
        expect(

            to_a('a', undefined as any)({a: 'b', c: 'd'}))

            .toEqual('b'))


    it('alternative',() =>
        expect(

            to_a(0, undefined as any)([1, 2]))

            .toEqual(1))


    it('alternative - undefined',() =>
        expect(

            to_a(3, undefined as any)([1, 2]))

            .toEqual(undefined))


    it('alternative - alternative',() =>
        expect(

            to_a(7, 7)([1, 2]))

            .toEqual(7))
})
