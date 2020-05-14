import {assoc} from "../../src/object";
import {flow} from "../../src/composition";

/**
 * tsfun | assoc
 */
describe('assoc', () => {

    it('assoc', () =>
        expect(

            assoc('a', 3, { a: 4 })

        ).toEqual({ a: 3 }))


    it('multiple parameter lists', () =>
        expect(

            assoc('a', 3)({ a: 4 })

        ).toEqual({ a: 3 }))


    it('for use in compositions', () =>
        expect(

            flow({ a: 4 }
            , assoc('a', 3)
            )

        ).toEqual({ a: 3 }))


    it('typing', () => {

        interface A { a: number, b: string }

        // 1. key checking

        // When used with a single argument list, the key can get checked

        const result1: A = assoc('a', 3, { a: 7, b: '7' })
        const result2: A = assoc('a', 3, { a: 7, b: '4', c: 7 })
        // const result: A = assoc('c' /*!*/, '4', {a: 4, b: '7'}) // WRONG - the given key does not exist

        // With a separate argument lists, however, this gets not caught
        const result3: A = assoc('c' /*!*/, '4')({a: 4, b: '7'})   // WRONG, but passes


        // 2. value checking

        interface C { c: number }

        const result4: A = assoc('a', 3)({a: 7, b: '7'})
        const result5: A = assoc('a', 3)({a: 7, b: '7', c: 7})

        // const result: A = assoc('a', 4, {a: '4', b: '7'}) // WRONG
        // const result: A = assoc('a', 4)({a: '4', b: '7'}) // WRONG
        // const result: C = assoc('c', 4)({a: '4'}) // WRONG
        // const result: C = assoc('c', 4, {a: '4'}) // WRONG

        // since the second param gets inferred as union type, we can only check if the inferred param is in the union
        const result7: A = assoc('a', '4', { a: 4, b: '7' }) // passes for the given reason
        // const result6: A = assoc('a', [], { a: 4, b: '7' }) // WRONG

        // this however does not work anyway in case of multiple parameter lists, because the T gets inferred in the outer param list
        const result8: A = assoc('a', '4')({a: 7, b: '7'})   // passes for the given reason
        const result6: A = assoc('a', [])({ a: 4, b: '7' })  // passes for the given reason
    })
})