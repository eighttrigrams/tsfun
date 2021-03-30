import {Map} from '../../src/type'
import { flow } from '../../src/composition'
import {detach} from '../../src/struct'
import { expectType } from 'ts-expect'


/**
 * tsfun | detach
 *
 * Detach from a Map, an Array, or a Struct.
 */
describe('detach', () => {

    it('detach', () => {

        const $1 = detach('a')({ a: 4 } as Map<number>)
        expect($1).toEqual({})

        const $2 = detach('a', { a: 4 } as Map<number>)
        expect($2).toEqual({})

        const $3 = detach(0, [1, 2])
        expect($3).toEqual([2])

        const $4 = detach(0)([1, 2])
        expect($4).toEqual([2])


        const a = { a: 3, b: '4' }

        const $5: {b: string} = detach('a')(a)
        expect($5).toEqual({ b: '4' })

        const $6: {b: string} = detach('a', a)
         expect($6).toEqual({ b: '4' })


        // Structs //

        // Record

        const $7: {a: {}} = detach(['a', 'b'])({ a: { b: {} } })
        expect($7).toEqual({ a: {}})

        const $8: {a: {}} = detach(['a', 'b'], { a: { b: {} } })
        expect($8).toEqual({ a: {} })

        // Tuple

        const $9: Array<{}> = detach([0, 'b'])([{ b: {} }])
        expect($9).toEqual([{}])

        const $10: Array<{}> = detach([0, 'b'], [{ b: {} }])
        expect($10).toEqual([{}])
    })


    it('simple case', () => {

        const objectStruct = { a: { b: 'c' }}
        const $1: any = detach(['a', 'b'])(objectStruct)

        expect($1).not.toBe(objectStruct)
        expect($1).toEqual({ a: {} })
        expect($1['a']['b']).toBeUndefined()
    })


    it('first layer', () => {

        const embeddedStruct = { d: 'd_val' }

        const objectStruct = { a: 'a_val', c: embeddedStruct }
        const resultStruct = detach('c')(objectStruct)

        expect(resultStruct).not.toBe(objectStruct)
        expect(embeddedStruct['d']).toBe('d_val')
        expect(objectStruct['a']).toBe('a_val')
        expect(resultStruct['c']).toBeUndefined()
    })


    it('detach - second layer', () => {

        const embeddedStruct = { e: 'e_val' }

        const objectStruct = { a: { b: 'b_val', c: embeddedStruct}, d: embeddedStruct }
        const resultStruct: any = detach(['a', 'c'])(objectStruct)

        expect(resultStruct).not.toBe(objectStruct)
        expect(resultStruct['d']).toBe(embeddedStruct)
        expect(resultStruct['a']['c']).toBeUndefined()
        expect(resultStruct['a']['b']).toBe('b_val')
        expect(objectStruct['a']['c']).toBe(embeddedStruct)
        expect(embeddedStruct['e']).toBe('e_val')
    })


    it('do not create anything', () => {

        const objectStruct = {}
        const resultStruct = detach(['a', 'c'])(objectStruct)

        // does not create the a property, just to get to the 'c' property
        expect(resultStruct).toEqual({})
    })


    it('typing', () => {

        const $1 = detach('a')({ a: 4 } as Map<number>)
        expectType<Map<number>>($1)

        const $2 = detach('a', { a: 4 } as Map<number>)
        expectType<Map<number>>($2)

        const $3 = detach(0, [1, 2])
        expectType<Array<number>>($3)

        const $4 = detach(0)([1, 2])
        expect($4).toEqual([2])
        expectType<Array<number>>($4)

        const a /*{ a: number, b: string }*/ = { a: 3, b: '4' }

        const $5 = detach('a')(a)
        expectType<{a: number, b: string}>($5)

        const $6 = detach('a', a)
        expectType<{a: number, b: string}>($6)

        const $7 = detach(['a', 'b'])({ a: { b: {} } })
        expectType<{a: {b: {}}}>($7)

        const $8 = detach(['a', 'b'], { a: { b: {} } })
        expectType<{a: {b: {}}}>($8)

        const $9: Map<number>
            = flow({ a: 7 }
            , detach('a')
            )
    })


    it('simple case - see path', () => {

        const objectStruct = { 'a.b': 'c' }
        const resultStruct = detach('a.b')(objectStruct)

        expect(resultStruct).not.toBe(objectStruct)
        expect(resultStruct['a.b']).toBeUndefined()
    })


    it('array', () => {

        expect(detach(2)([1, 5, 7, 9])).toEqual([1, 5, 9])
        expect(detach(2, [1, 5, 7, 9])).toEqual([1, 5, 9])
    })


    it('instances', () => {

        const instance = {a: 3}
        const originalColl = [4, instance as any, 7, 9]
        const resultColl = detach(1)(originalColl)

        expect(resultColl).not.toBe(originalColl)
        expect(resultColl).toEqual([4, 7, 9])
        expect(instance).toEqual({a: 3})
    })
})
