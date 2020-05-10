import {assoc} from "../../src/object";

/**
 * tsfun | assoc
 */
describe('assoc', () => {

    it('assoc', () =>

        expect(

            assoc('a', 3, { a: 4 })

        ).toEqual({a: 3})
    )


    it('typing', () => {

        interface A { a: number }
        interface B { b: number }

        const result1: A = assoc('a', 3, {a: 7})
        const result2: A = assoc('a', 3, {a: 7, b: 4})
        // const result: A = assoc('a', '4', {a: 4}) // WRONG
        // const result: A = assoc('a', 4, {a: '4'}) // WRONG
        // const result: B = assoc('b', 4, {a: '4'}) // WRONG
    })
})