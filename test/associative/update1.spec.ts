import {map, update1} from '../../src/associative'
import { flow } from '../../src/composition'


/**
 * tsfun | update1
 * 
 * The regular update function infers from { a: VALUE } a result of type { a: T },
 * wheras this version will say it is Map<T>.
 */
describe('update1', () => {

    const inc = (x: number) => x + 1

    it('Map', () => {
    
        const $1 /*: Map<number>*/ = update1('b', inc /*update*/, {a: 4, b: 7})
        expect($1).toEqual({a: 4, b: 8})

        const $2 /*: Map<number>*/ = update1('b', 8 /*assoc*/, {a: 4, b: 7})
        expect($2).toEqual({a: 4, b: 8})

        const $3 /*: Map<number>*/ = update1('b', inc /*update*/)({a: 4, b: 7})
        expect($3).toEqual({a: 4, b: 8})

        const $4 /*: Map<number>*/ = update1('b', 8 /*assoc*/)({a: 4, b: 7})
        expect($4).toEqual({a: 4, b: 8})
    })


    it('Associative', () => {

        // It works for both Array and Map so that one can
        // work with them just as Associative in a composition

        const $1 /*: Map<number>*/ = 
            flow(
                {a: 4, b: 7},
                update1('b', 8 /*assoc*/))
        expect($1).toEqual({a: 4, b: 8})
        
        const $2 /*: Array<number>*/ = 
            flow(
                [4, 7],
                update1(1, 8 /*assoc*/))
        expect($2).toEqual([4, 8])

        const $3 /*: Map<number>*/ = 
            flow(
                {a: 4, b: 7},
                update1('b', inc /*update*/))
        expect($3).toEqual({a: 4, b: 8})
        
        const $4 /*: Array<number>*/ = 
            flow(
                [4, 7],
                update1(1, inc /*update*/))
        expect($4).toEqual([4, 8])
    })


    it('array - ignore undefined indices', () => {

        const result = update1(3, 8)([11, 12])
        expect(result[3]).toEqual(8)
        expect(result[2]).toBeUndefined()
    })


    it('pitfall', () => {

        const result = map(update1('a', {}))([{a: 1}, {a: 1}]) as Array<{a: number}>
        expect(result[0].a).toBe(result[1].a) // this is possibly not be what one wants

        // to circumvent this, we use it like this
        const result2 = map(update1('a', () => ({})))([{a: 1}, {a: 1}]) as Array<{a: any}>
        expect(result2[0].a).toEqual({})
        expect(result2[0].a).not.toBe(result[1].a)
    })
})
