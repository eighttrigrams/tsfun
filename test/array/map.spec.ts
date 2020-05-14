import {map} from '../../src/array';
import {to} from '../../src/struct';
import {flow, nop} from '../../src/composition';
import {Associative} from '../../src/type';


/**
 * tsfun | map
 *
 * Allows for mapping over Associative collections
 */
describe('map', () => {

    it('multiple parameter lists', () => {

        // in composition context, two parameter lists are used,
        // of which the first expects the mapping function
        expect(

            map
            (_ => 2 * _)
            ([3, 7])

        ).toEqual([6, 14])
    })


    it('map - with to and flow', () => {

        expect(

            flow(
                [{a: 1}, {a: 3}],
                map(to('a'))
            )

        ).toEqual([1, 3])
    })


    it('indexed', () => {

        // indices are accessible on every item call
        expect(

            map((item: number, i: number) => item * i)([2, 3, 4]))

            .toEqual([0, 3, 8])
    })


    it('illegal arguments', () => {

        expect(() => (map as any)([])).toThrow()
        expect(() => (map as any)([], [])).toThrow()
        // expect(() => (map as any)(nop, nop)).toThrow() // TODO enable
        expect(() => (map as any)(nop)(nop)).toThrow()
        // expect(() => (map as any)(nop, [], [])).toThrow() // TODO enable
    })


    it('typing', () => {

        const result1: Associative = map(_ => _.toString())([1])

        // map(_ => _.toExponential(2), ['3']) // WRONG
        // map(_ => _.toExponential(2), {a: '3'}) // WRONG
        // '3'.toExponential(2) // see this

        // map((_, k) => _ - k, {a: 3}) // WRONG, k is string
        map((_: number, i: number) => _ - i)([3]) // although not with multiple parameter lists
    })
})
