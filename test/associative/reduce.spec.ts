import {Map} from '../../src/type'
import { map, reduce, stop } from '../../src/associative'


/**
 * tsfun | reduce
 */
describe('reduce', () => {

    it('Array', () =>
        expect(

            reduce((b: number, a: number, i: number) => b + a + i, 0)([1, 5, 6]))

            .toBe(15))

    it('Map', () =>
        expect(

            reduce((b: number, a: number, _k: string) => b + a, 0)({a: 1, b: 5, c: 6}))

            .toBe(12))


    it('Array - single argument list', () =>
        expect(

            reduce([1, 5, 6], (b: number, a: number) => b + a, 0))

            .toBe(12))

    it('Map - single argument list', () =>
        expect(

            reduce({a: 1, b: 5, c: 6}, (b: number, a: number) => b + a, 0))

        .toBe(12))


    it('in combination with map', () => {

        const f = (b: Map<true>, a: string) => (b[a] = true, b)

        const $ = map([['a'], ['b']],
            reduce(f, {} /* this here */))

        // This is certainly not what we want
        expect($).toEqual([{a: true, b: true}, {a: true, b: true}])
        expect($[0]).toBe($[1])
        // The reason is, that the empty array literal passed to reduce is one and the same instance


        // Avoid this by using it like this
        const $1 = map([['a'], ['b']], reduce(f, () => ({} as Map<true>) /* this here */))

        expect($1).toEqual([{a: true}, {b: true}])
        expect($1[0]).not.toBe($1[1])

        // or by doing this
        const $2 = map([['a'], ['b']], _ => reduce(_, f, {}))

        expect($2).toEqual([{a: true}, {b: true}])
        expect($2[0]).not.toBe($2[1])

        // which obviously could be done for arrays like this
        const $3 = map([['a'], ['b']], _ => _.reduce(f, {}))

        expect($3).toEqual([{a: true}, {b: true}])
        expect($3[0]).not.toBe($3[1])
        // but which does not work for Map, obviously
    })


    it('Stop', () =>
        expect(

            reduce((b: number, a: number) => {

                if (b > 1) stop(10)
                return a + b

            }, 0)({a: 1, b: 5, c: 6}))

            .toBe(10))
})
