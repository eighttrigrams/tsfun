import {Map} from '../../../src/type'
import { flow } from '../../../src/composition'
import {dissoc, path} from '../../../src/struct'

/**
 * tsfun | dissoc
 * 
 * Dissoc from a Map, an Array, or a Struct.
 * 
 * Typewise dissocing from a record is not supported,
 * because it would change the record type.
 */
describe('dissoc', () => {

    it('dissoc', () => {

        const $1 /*: Map<number>*/ = dissoc('a')({ a: 4 })
        expect($1).toEqual({})

        const $2 /*: Map<number>*/ = dissoc('a', { a: 4 })
        expect($2).toEqual({})

        const $3 /*:Array<number>*/ = dissoc(0, [1, 2])
        expect($3).toEqual([2])

        const $4 /*:Array<number>*/ = dissoc(0)([1, 2])
        expect($4).toEqual([2])


        
        // To signal a Struct, use a path
        const a /*{ a: number, b: string }*/ = { a: 3, b: '4' }

        const $5 /*: unknown*/ = dissoc(['a'])(a) // Usually 1-element paths are not used, here however they do
        expect($5).toEqual({ b: '4' })

        const $6 /*: unknown*/ = dissoc(['a'], a)
         expect($6).toEqual({ b: '4' })

        const $7 /*: unknown*/ = dissoc(['a', 'b'])({ a: { b: {} } })
        expect($7).toEqual({ a: {}})

        const $8 /*: unknown*/ = dissoc(['a', 'b'], { a: { b: {} } })
        expect($8).toEqual({ a: {} })
    })


    it('simple case', () => {

        const objectStruct = { a: { b: 'c' }}
        const $1: any = dissoc(path('a.b'))(objectStruct)

        expect($1).not.toBe(objectStruct)
        expect($1).toEqual({ a: {} })
        expect($1['a']['b']).toBeUndefined()
    })


    it('first layer', () => {

        const embeddedStruct = { d: 'd_val' }

        const objectStruct = { a: 'a_val', c: embeddedStruct }
        const resultStruct = dissoc('c')(objectStruct)

        expect(resultStruct).not.toBe(objectStruct)
        expect(embeddedStruct['d']).toBe('d_val')
        expect(objectStruct['a']).toBe('a_val')
        expect(resultStruct['c']).toBeUndefined()
    })


    it('dissoc - second layer', () => {

        const embeddedStruct = { e: 'e_val' }

        const objectStruct = { a: { b: 'b_val', c: embeddedStruct}, d: embeddedStruct }
        const resultStruct: any = dissoc(path('a.c'))(objectStruct)

        expect(resultStruct).not.toBe(objectStruct)
        expect(resultStruct['d']).toBe(embeddedStruct)
        expect(resultStruct['a']['c']).toBeUndefined()
        expect(resultStruct['a']['b']).toBe('b_val')
        expect(objectStruct['a']['c']).toBe(embeddedStruct)
        expect(embeddedStruct['e']).toBe('e_val')
    })


    it('do not create anything', () => {

        const objectStruct = {}
        const resultStruct = dissoc(path('a.c'))(objectStruct)

        // does not create the a property, just to get to the 'c' property
        expect(resultStruct).toEqual({})
    })


    it('typing', () => {

        interface C { c: number }

        const $1: Map<number> = dissoc('a', { a: 7, b: 7 })
        const $2: Array<number> = dissoc(0)([2, 3])
        const $3: Map<string|number> = dissoc('a', { a: 7, b: '4', c: 7 })

        const $4: Map<number>
            = flow({ a: 7 }
            , dissoc('a')
            )
    })


    it('simple case - see path', () => {

        const objectStruct = { 'a.b': 'c' }
        const resultStruct = dissoc('a.b')(objectStruct)

        expect(resultStruct).not.toBe(objectStruct)
        expect(resultStruct['a.b']).toBeUndefined()
    })


    it('array', () => {

        expect(dissoc(2)([1, 5, 7, 9])).toEqual([1, 5, 9])
        expect(dissoc(2, [1, 5, 7, 9])).toEqual([1, 5, 9])
    })


    it('instances', () => {

        const instance = {a: 3}
        const originalColl = [4, instance as any, 7, 9]
        const resultColl = dissoc(1)(originalColl)

        expect(resultColl).not.toBe(originalColl)
        expect(resultColl).toEqual([4, 7, 9])
        expect(instance).toEqual({a: 3})
    })
})
