import {update} from "../../src/object";
import {flow} from "../../src/composition";

/**
 * tsfun/object | update
 */
describe('update', () => {

    const times2 = x => x * 2

    it('update', () =>
        expect(

            update('a', times2, { a: 4 })

        ).toEqual({ a: 8 }))


    it('multiple parameter lists', () =>
        expect(

            update('a', times2)({ a: 4 })

        ).toEqual({ a: 8 }))


    it('for use in compositions', () =>
        expect(

            flow({ a: 4 }
            , update('a', times2)
            )

        ).toEqual({ a: 8 }))


    it('typing', () => {

        interface A { a: number, b: string }

        // 1. key checking

        // When used with a single argument list, the key can get checked

        const result1: A = update('a', times2, { a: 7, b: '7' })
        const result2: A = update('a', times2, { a: 7, b: '4', c: 7 })
        // const result: A = update('c' /*!*/, times2, {a: 4, b: '7'}) // WRONG - the given key does not exist

        // With a separate argument lists, however, this gets not caught
        const result3: A = update('c' /*!*/, times2)({a: 4, b: '7'})   // WRONG, but passes
    })


    // setting values (assoc)

    interface A { a: number, b: string }
    const object: A = { a: 4, b: 'four' }

    it('single param list', () =>
        expect(

            update('a', 3, object)

        ).toEqual({ a: 3, b: 'four' })
    )


    it('multiple parameter lists', () =>
        expect(

            update('a', 3)(object)

        ).toEqual({ a: 3, b: 'four' })
    )

    
    it('for use in composition', () =>
        expect(

            flow(object
                , update('a', 3))

        ).toEqual({ a: 3, b: 'four' })
    )


    it('typing 2', () => {

        // 1. key checking

        // When used with a single argument list, the key can get checked

        const result1: A = update('a', 3, { a: 7, b: '7' })
        const result2: A = update('a', 3, { a: 7, b: '4', c: 7 })
        // const result: A = update('c' /*!*/, '4', {a: 4, b: '7'}) // WRONG - the given key does not exist

        // With a separate argument lists, however, this gets not caught
        const result3: A = update('c' /*!*/, '4')({a: 4, b: '7'})   // WRONG, but passes


        // 2. value checking

        // since the second param gets inferred as union type, we can only check if the inferred param is in the union
        const result7: A = update('a', '4', { a: 4, b: '7' })   // passes for the given reason
        // const result: A = update('a', [], { a: 4, b: '7' }) // WRONG

        // this however does not work anyway in case of multiple parameter lists, because the T gets inferred in the outer param list
        const result8: A = update('a', '4')({a: 7, b: '7'})
        const result6: A = update('a', [])({ a: 4, b: '7' })    // passes for the given reason
    })
})