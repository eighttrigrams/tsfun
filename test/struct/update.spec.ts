import {update} from '../../src/struct'
import {equal} from '../../src/comparator'
import {map_a} from '../../src/associative'
import {Map} from '../../src/type'
import {flow, val} from '../../src/composition'
import { map } from '../../src/array'
import { LEFT, RIGHT } from '../../src/tuple'
import { identity } from '../../src/core'


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
    const fromString = (x: string) => parseInt(x)

    it('Interfaces, Tuples', () => {

        interface A {
            name: string,
            age: number
        }

        const a: A = { name: 'Daniel', age: 40 }

        const $1 /*: A*/ = update('age', $times2, a)
        const $2 /*: A*/= update('name', 'asd', a)
        const $3 /*: unknown*/ = update('name', 3, a)
        const $4 /*: unknown*/ = update('age', toString, a)
        const $5 /*: A*/ = update('age', $times2)(a)     // curried, no key checking available
        const $6 /*: unknown*/= update('name', 'asd')(a) // curried, can't say definitely that it's of the same type
        const $7 /*: unknown*/ = update('name', 3)(a)
        const $8 /*: unknown*/ = update('age', toString)(a)


        type B = [string, number, string]

        const b: B = ['Daniel', 40, 'Hallo']

        const $9 /*: B*/ = update(1, $times2, b)
        const $10 /*: unknown*/= update(1, toString, b)
        const $12 /*: B*/ = update(0, 'O', b)
        const $13 /*: B*/ = update(1, 39, b)
        const $11 /*: unknown*/ = update(1, 'O', b)
        const $14 /*: B*/ = update(1, $times2)(b)
        // const $15 /*: unknown*/= update('name', 'asd')(b)      // key not checked
        // const $16 /*: unknown*/ = update('name', 3)(b)         // key not checked
        // const $17 /*: unknown*/ = update('age', toString)(b)   // key not checked


        type C = [string, number] // Pair

        const c: C = ['Daniel', 40]

        const $18 /*: [string,number]*/ = update(RIGHT, $times2, c)
        const $19 /*: [string,string]*/= update(RIGHT, toString, c)
        const $20 /*: [string,number]*/ = update(LEFT, identity, c)
        const $21 /*: [number,string]*/= update(LEFT, fromString, c)

        const $22 /*: [string,number]*/ = update(RIGHT, $times2)(c)
        const $23 /*: [string,string]*/= update(RIGHT, toString)(c)
        const $24 /*: C*/ = update(LEFT, identity)(c)
        const $25 /*: [number,number]*/= update(LEFT, fromString)(c)

        const $26 /*: [string,number]*/ = update(RIGHT, 41, c)
        const $27 /*: [string,string]*/= update(RIGHT, 'a', c)
        const $28 /*: [string,number]*/ = update(LEFT, 'a', c)
        const $29 /*: [number,string]*/= update(LEFT, 0, c)

        const $30 /*: [string,number]*/ = update(RIGHT, 41)(c)
        const $31 /*: [string,string]*/= update(RIGHT, 'a')(c)
        const $32 /*: [string,number]*/ = update(LEFT, 'a')(c)
        const $33 /*: [number,number]*/= update(LEFT, 0)(c)
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
        const $1 /*: S*/ = update(['a', 'b'], val(4) /* assoc */, s)
        expect($1.a.b).toBe(4)
        const $2 /*: S*/ = update(['a', 'b'], times2 /* update */, s)
        expect($2.a.b).toBe(6)

        type A = Array<Array<number>>
        const a: A = [[2]]
        const $3 /*: A*/ = update([0, 0], val(4) /* assoc */, a)
        expect($3[0][0]).toBe(4)
        const $4 /*: A*/ = update([0, 0], $times2 /* update */, a)
        expect($4[0][0]).toBe(4)

        type S1 = { a: Array<number> }
        const s1: S1 = { a: [2] }
        const $5 /*: S1*/ = update(['a', 0], val(4) /* assoc */, s1)
        expect($5.a[0]).toBe(4)
        const $6 /*: S1*/ = update(['a', 0], times2 /* update */, s1)
        expect($6.a[0]).toBe(4)

        type S2 = Array<{ a: number }>
        const s2: S2 = [{a: 2}]
        const $7 /*: S2*/ = update([0, 'a'], val(4) /* assoc */, s2)
        expect($7[0].a).toBe(4)
        const $8 /*: S2*/ = update([0, 'a'], $times2 /* update */, s2)
        expect($8[0].a).toBe(4)

        type S3 = [number[],{b: number}]
        const s3: S3 = [[1],{b:2}]
        const $9 /*: S3*/ = update([1, 'b'], val(4) /* assoc */, s3)
        expect($9[1].b).toBe(4)
        const $10 /*: S3*/ = update([1, 'b'], $times2 /* update */, s3)
        expect($10[1].b).toBe(4)

        // Pair special typing
        const $11 /*: [number,{b: number}]*/ = update([LEFT, 0], 3 /* assoc */, [[1],{b:5}])
        const $12 /*: [number[],number]*/ = update([RIGHT, 'b'], 3 /* assoc */, [[1],{b:5}])
        const $13 /*: [unknown,{b: number}]*/ = update([LEFT, 0], toString /* update */, [[1],{b:5}])
        const $14 /*: [number[],unknown]*/ = update([RIGHT, 'b'], toString /* update */, [[1],{b:5}])
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


        // Pair special typing
        const $11 /*: [number,{b: number}]*/ = update([LEFT, 0], 3 /* assoc */)([[1],{b:5}])
        const $12 /*: [number[],number]*/ = update([RIGHT, 'b'], 3 /* assoc */)([[1],{b:5}])
        const $13 /*: [unknown,{b: number}]*/ = update([LEFT, 0], toString /* update */)([[1],{b:5}])
        const $14 /*: [number[],unknown]*/ = update([RIGHT, 'b'], toString /* update */)([[1],{b:5}])
    })


    it('Arrays, Maps', () => {

        const m: Map<number> = { a: 4, b: 3}

        const $1 /*: Map<number>*/ = update('a', $times2 /*update*/, m)
        expect($1).toEqual({ a: 8, b:3 })
        const $2 /*: Map<number>*/ = update('a', 6 /*assoc*/, m)
        expect($2).toEqual({ a: 6, b:3 })

        const a: Array<number> = [4]

        const $5 /*: Array<number>*/ = update(0, $times2 /*update*/, a)
        expect($5).toEqual([8])
        const $6 /*: Array<number>*/ = update(0, 2 /*assoc*/, a)
        expect($6).toEqual([2])

        const $7 /*: Map<number>*/ = update('a', $times2 /* update*/)({a: 4, b: 5})
        expect($7).toEqual({ a: 8, b: 5 })
        const $8 /*: Map<any>*/ = update('a', 5 /*assoc*/)({a: 4, b: 5})
        expect($8).toEqual({ a: 5, b: 5 })

        const $9 /*: Map<number>*/ = flow({a: 4, b: 5}, update('a', $times2))
        expect($9).toEqual({a : 8, b: 5})
        const $10 /*: Map<any>*/ = flow({a: 4, b: 5}, update('a', 5))
        expect($10).toEqual({ a: 5, b: 5})

        const b: Array<number> = [4]

        const $11 /*: Array<number>*/ = update(0, times2)(b)
        expect($11).toEqual([8])
    })


    it('changing the type', () => {

        // If the mapping is done by a type altering function, i.e. number => string,
        // then we treat the object as a Struct and the final type is unknown.
        // We then also pass the path as an 1-elemnt-array to indicate where we use Struct, not Map, as input.
        const $1 /*: unknown*/ = update('a', (x: number) => x.toString(), { a: 7 })
        const $2 /*: unknown*/ = update('a', (x: number) => x.toString())({ a: 7 })
        const $4 /*: unknown*/ = update(['a', 'b'], (x: number) => x.toString(), { a: { b: 7} })
        const $5 /*: unknown*/ = update(['a', 'b'], (x: number) => x.toString(), { a: { b: 7} })

        const $10 /*: Map<any>*/ = update('a', '3', { a: 3 })
        const $11 /*: Map<any>*/ = update('a', '3')({ a: 3 })

        const $11a /*: Map<any>*/ = update('a', 3)({ a: 3 })        // isn't matched when curried
        const $13 /*: Map<number>*/ = update('a', val(3))({ a: 7 }) // use val to say its of the same type

        const $16 /*: Map<any>*/ = update('a', (x: number) => x.toString(), { a: 7 })
        const $17 /*: Map<any>*/ = update('a', (x: number) => x.toString())({ a: 7 })

        const $18 /*: Array<any>*/ = update(0, (x: number) => x.toString(), [1, 2]);
        const $19 /*: Array<any>*/ = update(0, (x: number) => x.toString())([1, 2]);
        const $20 /*: Array<any>*/ = update(0, '3', [1, 2]);
        const $21 /*: Array<any>*/ = update(0, '3')([1, 2]);
    })


    it('use case: using flow, update, val', () => {

        // As seen in the examples above, using val can help with typechecking.
        // If one has a homogeneous array, the resulting array can than be said to
        // be of the same type.

        const $1 /*: Array<Array<number>> */ =
            flow([[1,2], [3,4]],
                map(update(0, val(3))))
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

            equal({ a: { b: { c: 3 }}})(update(['a','b','c'], val(3))({}))

        ).toBeTruthy())


    it('set undefined', () => {

        type A = { a: number|undefined }
        const $1 = update('a', undefined)({ a: 3 } as A)
        expect($1).toEqual({ a: undefined })

        type B = { a: { b: number|undefined } }
        const $2 = update(['a', 'b'], undefined)({ a: { b: 3 } } as B)
        expect($2).toEqual({ a: { b: undefined } })
    })


    it('pitfall', () => {

        const result = map_a(update(['a', 'b'], {}))([{a: {b: 1}}, {a: {b: 1}}]) as Array<Map>
        expect(result[0].a.b).toBe(result[1].a.b) // this is possibly not be what one wants

        // to circumvent this, we use it like this
        const result2 = map_a(update(['a', 'b'], () => ({})))([{a: {b: 1}}, {a: {b: 1}}]) as Array<Map>
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
