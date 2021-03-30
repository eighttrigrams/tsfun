import {update} from '../../src/struct'
import {equal} from '../../src/comparator'
import {map} from '../../src/associative'
import {Map} from '../../src/type'
import {flow, val} from '../../src/composition'
import { L, R } from '../../src/tuple'


/**
 * tsfun | update
 *
 * Allows for replacing items in data structures.
 * The resulting structure is always a newly created one, so that
 * holders of the original reference will retain their original view on the data.
 */
describe('update', () => {

    const times2 = x => x * 2
    const $times2 = (x: number) => x * 2
    const toString = (x: number) => x.toString()


    it('Tuples, Records', () => {

        const m: {a: number, b: number }= { a: 4, b: 3 }

        const $1 = update('a', $times2 /*update*/, m)
        expect($1).toEqual({ a: 8, b:3 })
        const $2 = update('a', 6 /*assoc*/, m)
        expect($2).toEqual({ a: 6, b:3 })

        const a: [number] = [4]

        const $5 = update(0, $times2 /*update*/, a)
        expect($5).toEqual([8])
        const $6 = update(0, 2 /*assoc*/, a)
        expect($6).toEqual([2])

        const $7 = update('a', $times2 /* update*/)({a: 4, b: 5})
        expect($7).toEqual({ a: 8, b: 5 })
        const $8 = update('a', 5 /*assoc*/)({a: 4, b: 5})
        expect($8).toEqual({ a: 5, b: 5 })

        const $9 = flow({a: 4, b: 5}, update('a', $times2))
        expect($9).toEqual({a : 8, b: 5})
        const $10 = flow({a: 4, b: 5}, update('a', 5))
        expect($10).toEqual({ a: 5, b: 5})

        const b: [number] = [4]

        const $11 = update(0, times2)(b)
        expect($11).toEqual([8])
    })


    it('Structs', () => {

        // Struct use case
        //
        // The Struct use case allows for 'deep' updates
        // of data structures. It is active when the path
        // parameter is an array (of at least length 2)
        //
        // See also: path()

        type S = { a: { b: number } }
        const s: S = { a: { b: 3 }}
        const $1 = update(['a', 'b'], val(4) /* assoc */, s)
        expect($1.a.b).toBe(4)
        const $2 = update(['a', 'b'], times2 /* update */, s)
        expect($2.a.b).toBe(6)

        type A = Array<Array<number>>
        const a: A = [[2]]
        const $3 = update([0, 0], val(4) /* assoc */, a)
        expect($3[0][0]).toBe(4)
        const $4 = update([0, 0], $times2 /* update */, a)
        expect($4[0][0]).toBe(4)

        type S1 = { a: Array<number> }
        const s1: S1 = { a: [2] }
        const $5 = update(['a', 0], val(4) /* assoc */, s1)
        expect($5.a[0]).toBe(4)
        const $6 = update(['a', 0], times2 /* update */, s1)
        expect($6.a[0]).toBe(4)

        type S2 = Array<{ a: number }>
        const s2: S2 = [{a: 2}]
        const $7 = update([0, 'a'], val(4) /* assoc */, s2)
        expect($7[0].a).toBe(4)
        const $8 = update([0, 'a'], $times2 /* update */, s2)
        expect($8[0].a).toBe(4)

        type S3 = [number[],{b: number}]
        const s3: S3 = [[1],{b:2}]
        const $9 = update([1, 'b'], val(4) /* assoc */, s3)
        expect($9[1].b).toBe(4)
        const $10 = update([1, 'b'], $times2 /* update */, s3)
        expect($10[1].b).toBe(4)
    })


    it('structs - curried', () => {

        type S = { a: { b: number } }
        const s: S = { a: { b: 3 }}
        const $1 /*: S*/ = update(['a', 'b'], val(4) /* assoc */)(s)
        expect($1.a.b).toBe(4)
        const $2 /*: S*/ = update(['a', 'b'], times2 /* update */)(s)
        expect($2.a.b).toBe(6)
        const $3 /*: S*/ = flow(s, update(['a', 'b'], times2))
        expect($3.a.b).toBe(6)
    })


    it('typings', () => {

        interface A {
            name: string,
            age: number
        }
        const a: A = { name: 'Daniel', age: 40 }

        // Those return something of type A

        const $1 = update('age', $times2, a)
        const $2 = update('name', 'asd', a)

        const $5 = update('age', $times2)(a)
        const $6 = update('name', 'asd')(a)
        const $7 = update('name', 3)(a)
        const $8 = update('age', toString)(a)

        // key checking available (non-curried version only)
        // const $56 = update('a', 'asd', a)
        // const $3 = update('name', 3, a)

        // allowed function or value checking (non-curried version only)
        const $57 /*: unknown*/ = update('age', '19', a)
        const $58 /*: unknown*/ = update('age', (x: string) => 7, a)
        const $59 /*: unknown*/ = update('age', (x: number) => 'a', a)

        type B = [string, number, string]
        const b: B = ['Daniel', 40, 'Hallo']

        // Those return something of type B

        const $9 = update(1, $times2, b)
        const $12 = update(0, 'O', b)
        const $13 = update(1, 39, b)

        const $14 = update(1, $times2)(b)

        // allowed function or value and key-checking (non-curried version only)
        const $11 /*: unknown */ = update(3, 'O', b) // out of range
        const $10 = update(1, (x: number) => '1', b) // wrong target type
        const $15 = update(1, (x: string) => 1, b) // wrong source type
        const $19 = update(1, 'a', b) // wrong type


        type C = [{a: number}]
        const c: C = [{a: 3}]

        // return type is always C
        const $79 = update([0, 'a'], (x: number) => 3, c)
        const $80 = update([0, 'a'], 'a', c)
        const $81 = update([0, 'a'], 3, c)
        const $82 = update([0, 'a'], (x: number) => '3', c)

        const $83 = update([0, 'a'], (x: number) => 3)(c)
        const $84 = update([0, 'a'], 'a')(c)
        const $85 = update([0, 'a'], 3)(c)
        const $86 = update([0, 'a'], (x: number) => '3')(c)
    })


    it('new structures', () => {

        // Update always returns
        // a new instance of the original type

        const m: Map<number> = { a: 4, b: 3}

        const $1 = update('a', times2, m)
        expect($1).toEqual({ a: 8, b:3 })
        expect($1).not.toBe(m)             // <-


        const a: Array<number> = [4]

        const $2 = update(0, times2, a)
        expect($2).toEqual([8])
        expect($2).not.toBe(a)             // <-


        // While we end up with new box structures,
        // that however does not mean that we deep copy,
        // like the following example shows

        const original = { a: 4 }
        const b: Array<any> = [{ a: 3 }, original]
        const $3 = update(0, { a: 5 }, b)
        expect($3[1]).toBe(original)       // <-
    })


    it('structs - create path', () =>
        expect(

            equal({ a: { b: { c: 3 }}})(update(['a','b','c'], val(3))({}) as any)

        ).toBeTruthy())


    it('set undefined', () => {

        type A = { a: number|undefined }
        const $1 = update('a', undefined)({ a: 3 } as A)
        expect($1).toEqual({ a: undefined })

        type B = { a: { b: number|undefined } }
        const $2 = update(['a', 'b'], undefined)({ a: { b: 3 } } as B)
        expect($2).toEqual({ a: { b: undefined } })
    })


    it('use case: using flow, update, val', () => {

        // As seen in the examples above, using val can help with typechecking.
        // If one has a homogeneous array, the resulting array can than be said to
        // be of the same type.

        const $1 /*: Array<Array<number>> */ =
            flow([[1,2], [3,4]],
                map(update(0, val(3))))
    })


    it('pitfall', () => {

        const result = map(update(['a', 'b'], {}))([{a: {b: 1}}, {a: {b: 1}}]) as Array<Map>
        expect(result[0].a.b).toBe(result[1].a.b) // this is possibly not be what one wants

        // to circumvent this, we use it like this
        const result2 = map(update(['a', 'b'], () => ({})))([{a: {b: 1}}, {a: {b: 1}}]) as Array<Map>
        expect(result2[0].a.b).toEqual({})
        expect(result2[0].a.b).not.toBe(result[1].a.b)
    })


    it('three levels', () => {

        const objectStruct = { a: { b: { c: 'c_val'} }}

        const $1: any = update(['a', 'b', 'c'], 'c_val_new', objectStruct) // assoc
        expect($1['a']['b']['c']).toBe('c_val_new')

        const $2 = update(['a','b','c'], (val: string) => val + '_new')(objectStruct) // curried, update
        expect($2['a']['b']['c']).toBe('c_val_new')
    })


    // The following cases demonstrate how always new instances are created
    // along the given paths

    it('object-struct - update - second level - curried', () => {

        const embeddedStruct = { e: 'e_val' }

        const objectStruct = { a: { b: 'b_val', c: embeddedStruct}, d: embeddedStruct }
        const resultStruct = update(['a','b'], (val: string) => val + '_new')(objectStruct)

        expect(resultStruct).not.toBe(objectStruct)
        expect(resultStruct['d']).toBe(embeddedStruct)
        expect(resultStruct['a']['c']).toBe(embeddedStruct)
        expect(resultStruct['a']).not.toBe(objectStruct['a'])

        expect(resultStruct['a']['b']).toBe('b_val_new')

        // changes
        resultStruct['a']['b'] = 'b_val_changed'
        expect(objectStruct['a']['b']).toBe('b_val')
    })


    it('first level object - second level object', () => {

        const embeddedStruct = { e: 'e_val' }

        const objectStruct = { a: { b: 'b_val', c: embeddedStruct}, d: embeddedStruct }
        const resultStruct: any = update(['a', 'b'], 'b_val_new')(objectStruct)

        expect(resultStruct).not.toBe(objectStruct)
        expect(resultStruct['d']).toBe(embeddedStruct)
        expect(resultStruct['a']['c']).toBe(embeddedStruct)
        expect(resultStruct['a']).not.toBe(objectStruct['a'])

        expect(resultStruct['a']['b']).toBe('b_val_new')

        // changes do not affect original
        resultStruct['a']['b'] = 'b_val_changed'
        expect(objectStruct['a']['b']).toBe('b_val')
    })


    it('first level array - second level object', () => {

        const embeddedStruct = { e: 'e_val' }

        const objectStruct: any = [{ b: 'b_val', c: embeddedStruct}, embeddedStruct]
        const resultStruct: any = update([0, 'b'], 'b_val_new')(objectStruct)

        expect(resultStruct).not.toBe(objectStruct)
        expect(resultStruct[1]).toBe(embeddedStruct)
        expect(resultStruct[0]['c']).toBe(embeddedStruct)
        expect(resultStruct[0]).not.toBe(objectStruct[0])

        expect(resultStruct[0]['b']).toBe('b_val_new')

        // changes do not affect original
        resultStruct[0]['b'] = 'b_val_changed'
        expect(objectStruct[0]['b']).toBe('b_val')
    })


    it('first level array - second level array', () => {

        const embeddedStruct = { e: 'e_val' }

        const objectStruct: any = [['b_val', embeddedStruct], embeddedStruct]
        const resultStruct: any = update([0, 0], 'b_val_new')(objectStruct)

        expect(resultStruct).not.toBe(objectStruct)
        expect(resultStruct[1]).toBe(embeddedStruct)
        expect(resultStruct[0][1]).toBe(embeddedStruct)
        expect(resultStruct[0]).not.toBe(objectStruct[0])

        expect(resultStruct[0][0]).toBe('b_val_new')

        // changes do not affect original
        resultStruct[0][0] = 'b_val_changed'
        expect(objectStruct[0][0]).toBe('b_val')
    })


    it('first level object - second level array - third level object', () => {

        const embeddedStruct = { e: 'e_val' }

        const objectStruct: any = { a: [{f: 'f_val', g: embeddedStruct}, embeddedStruct], d: embeddedStruct }
        const resultStruct: any = update(['a',0, 'f'], 'f_val_new')(objectStruct)

        expect(resultStruct).not.toBe(objectStruct)
        expect(resultStruct['d']).toBe(embeddedStruct)
        expect(resultStruct['a'][1]).toBe(embeddedStruct)
        expect(resultStruct['a'][0]['g']).toBe(embeddedStruct)
        expect(resultStruct['a']).not.toBe(objectStruct['a'])
        expect(resultStruct['a'][0]).not.toBe(objectStruct['a'][0])

        expect(resultStruct['a'][0]['f']).toBe('f_val_new')

        // changes do not affect original
        resultStruct['a'][0]['f'] = 'f_val_changed'
        expect(objectStruct['a'][0]['f']).toBe('f_val')
    })


    it('first level array - second level object - third level array', () => {

        const embeddedStruct = { e: 'e_val' }

        const objectStruct: any = [{f: ['f_val', embeddedStruct], g: embeddedStruct}, embeddedStruct ]
        const resultStruct: any = update([0, 'f', 0], 'f_val_new')(objectStruct)

        expect(resultStruct).not.toBe(objectStruct)
        expect(resultStruct[1]).toBe(embeddedStruct)
        expect(resultStruct[0]['g']).toBe(embeddedStruct)
        expect(resultStruct[0]['f'][1]).toBe(embeddedStruct)
        expect(resultStruct[0]).not.toBe(objectStruct[0])
        expect(resultStruct[0]['f']).not.toBe(objectStruct[0]['f'])

        expect(resultStruct[0]['f'][0]).toBe('f_val_new')

        // changes do not affect original
        resultStruct[0]['f'][0] = 'f_val_changed'
        expect(objectStruct[0]['f'][0]).toBe('f_val')
    })
})
