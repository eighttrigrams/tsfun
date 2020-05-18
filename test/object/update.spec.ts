import {update} from "../../src/object";
import {flow} from "../../src/composition";

/**
 * tsfun | update
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
})