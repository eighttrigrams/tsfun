import {dissoc} from "../../src/object";

/**
 * tsfun | dissoc
 */
describe('dissoc', () => {

    interface A { a?: number, b?: string }

    it('dissoc', () => {

        expect(dissoc('a')({ a: 4 } as A)).toEqual({ })
        expect(dissoc('a', { a: 4 } as A)).toEqual({ })
    })


    it('typing', () => {

        interface C { c: number }

        const result1: A = dissoc('a', { a: 7, b: '7' })
        const result2: A = dissoc('a', { a: 7, b: '4', c: 7 })
        const result4: A = dissoc('a')({a: 7, b: '7'})
        const result5: A = dissoc('a')({a: 7, b: '7', c: 7})

        // const result: A = dissoc('c' /*!*/, {a: 4, b: '7'}) // WRONG - the given key does not exist

        // const result: A = dissoc('a', {a: '4', b: '7'}) // WRONG
        // const result: A = dissoc('a')({a: '4', b: '7'}) // WRONG
        // const result: C = dissoc('c')({a: '4'}) // WRONG
        // const result: C = dissoc('c', {a: '4'}) // WRONG

        // since the second param gets inferred as union type, we can only check if the inferred param is in the union
        const result7: A = dissoc('a',  { a: 4, b: '7' }) // passes for the given reason

        // this however does not work anyway in case of multiple parameter lists, because the T gets inferred in the outer param list
        const result8: A = dissoc('a')({a: 7, b: '7'})   // passes for the given reason
        const result6: A = dissoc('a')({ a: 4, b: '7' }) // passes for the given reason
    })
})