import {map, update} from '../../../src/associative'


/**
 * tsfun/associative | update
 */
describe('update', () => {

    it('array', () =>
        expect(

            update(3, (x: number) => x + 1)([1, 5, 7, 9])

        ).toEqual([1, 5, 7, 10]))


    it('object', () =>
        expect(

            update('b', (x: number) => x + 1)({a: 3, b: 7})

        ).toEqual({a: 3, b: 8}))


    it('array - assoc', () =>
        expect(

            update(3, 18)([1, 5, 7, 9])

        ).toEqual([1, 5, 7, 18]))


    it('object - assoc', () =>
        expect(

            update('b', 17)({a: 3, b: 7})

        ).toEqual({a: 3, b: 17}))


    it('array - ignore undefined indices', () => {

        const result = update(3, 8)([11, 12])
        expect(result[3]).toEqual(8)
        expect(result[2]).toBeUndefined()
    })


    it('pitfall', () => {

        const result = map(update('a', {}))([{a: 1}, {a: 1}]) as Array<{a: number}>
        expect(result[0].a).toBe(result[1].a) // this is possibly not be what one wants

        // to circumvent this, we use it like this
        const result2 = map(update('a', () => ({})))([{a: 1}, {a: 1}]) as Array<{a: any}>
        expect(result2[0].a).toEqual({})
        expect(result2[0].a).not.toBe(result[1].a)
    })
})
