import {Map} from '../../src/type'
import {reduce} from '../../src/array'
import { map } from '../../src/associative'


/**
 * tsfun | reduce
 */
describe('reduce', () => {

    it('array', () =>
        expect(

            reduce((b: number, a: number) => b + a, 0)([1, 5, 6]))

            .toBe(12))


    it('single argument list', () =>
        expect(

            reduce([1, 5, 6], (b: number, a: number) => b + a, 0))

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
    })
})
