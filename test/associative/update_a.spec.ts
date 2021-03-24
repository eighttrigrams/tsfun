import {map, update_a as update_a} from '../../src/associative'
import { flow } from '../../src/composition'


/**
 * tsfun | update_a
 *
 * As opposed to *update*, which views its data as
 * Struct, i.e. as Tuple, Interface or nested structure,
 * *update_a* works with homogeneous Map-s and Array-s.
 */
describe('update_a', () => {

    const toString = (x: number) => x.toString()
    const inc = (x: number) => x + 1


    it('Map and Array', () => {

        const $1 /*: Map<number>*/ = update_a('b', inc /*update*/, {a: 4, b: 7})
        expect($1).toEqual({a: 4, b: 8})

        const $2 /*: Map<number>*/ = update_a('b', 8 /*assoc*/, {a: 4, b: 7})
        expect($2).toEqual({a: 4, b: 8})

        const $3 /*: Map<number>*/ = update_a('b', inc /*update*/)({a: 4, b: 7})
        expect($3).toEqual({a: 4, b: 8})

        const $4 /*: Map<number>*/ = update_a('b', 8 /*assoc*/)({a: 4, b: 7})
        expect($4).toEqual({a: 4, b: 8})


        const $5 /*: Array<number>*/ = update_a(1, inc /*update*/, [4, 7])
        expect($5).toEqual([4, 8])

        const $6 /*: Array<number>*/ = update_a(1, 8 /*assoc*/, [4, 7])
        expect($6).toEqual([4, 8])

        const $7 /*: Array<number>*/ = update_a(1, inc /*update*/)([4, 7])
        expect($7).toEqual([4, 8])

        const $8 /*: Array<number>*/ = update_a(1, 8 /*assoc*/)([4, 7])
        expect($8).toEqual([4, 8])
    })


    it('Types changed', () => {

        const $1 /*: Map<any>*/ = update_a('b', toString /*update*/, {a: 4, b: 7})
        expect($1).toEqual({a: 4, b: '7'})

        const $2 /*: Map<any>*/ = update_a('b', 'a' /*assoc*/, {a: 4, b: 7})
        expect($2).toEqual({a: 4, b: 'a'})

        const $3 /*: Map<unknown>*/ = update_a('b', toString /*update*/)({a: 4, b: 7})
        expect($3).toEqual({a: 4, b: '7'})

        const $4 /*: Map<unknown>*/ = update_a('b', 'a' /*assoc*/)({a: 4, b: 7})
        expect($4).toEqual({a: 4, b: 'a'})


        const $5 /*: Array<any>*/ = update_a(1, toString /*update*/, [4, 7])
        expect($5).toEqual([4, '7'])

        const $6 /*: Array<any>*/ = update_a(1, 'a' /*assoc*/, [4, 7])
        expect($6).toEqual([4, 'a'])

        const $7 /*: Array<unknown>*/ = update_a(1, toString /*update*/)([4, 7])
        expect($7).toEqual([4, '7'])

        const $8 /*: Array<number>*/ = update_a(1, 'a' /*assoc*/)([4, 7])
        expect($8).toEqual([4, 'a'])
    })


    it('Associative', () => {

        // It works for both Array and Map so that one can
        // work with them just as Associative in a composition

        const $1 /*: Map<number>*/ =
            flow(
                {a: 4, b: 7},
                update_a('b', 8 /*assoc*/))
        expect($1).toEqual({a: 4, b: 8})

        const $2 /*: Array<number>*/ =
            flow(
                [4, 7],
                update_a(1, 8 /*assoc*/))
        expect($2).toEqual([4, 8])

        const $3 /*: Map<number>*/ =
            flow(
                {a: 4, b: 7},
                update_a('b', inc /*update*/))
        expect($3).toEqual({a: 4, b: 8})

        const $4 /*: Array<number>*/ =
            flow(
                [4, 7],
                update_a(1, inc /*update*/))
        expect($4).toEqual([4, 8])
    })


    it('array - ignore undefined indices', () => {

        const result = update_a(3, 8)([11, 12])
        expect(result[3]).toEqual(8)
        expect(result[2]).toBeUndefined()
    })


    it('pitfall', () => {

        const result = map(update_a('a', {}))([{a: 1}, {a: 1}]) as Array<{a: number}>
        expect(result[0].a).toBe(result[1].a) // this is possibly not be what one wants

        // to circumvent this, we use it like this
        const result2 = map(update_a('a', () => ({})))([{a: 1}, {a: 1}]) as Array<{a: any}>
        expect(result2[0].a).toEqual({})
        expect(result2[0].a).not.toBe(result[1].a)
    })
})
