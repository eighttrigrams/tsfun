import {expectNever, expectType} from 'ts-expect'
import {Expect, Map} from '../../src/type'
import {forEach} from '../../src/associative'


/**
 * tsfun | forEach
 */
describe('forEach', () => {

    it('forEach - Map', () => {

        let acc = 1
        const items = forEach([2, 4, 3], (item: number) => {
            acc += item
        })
        expect(items).toEqual([2, 4, 3])
        expect(acc).toEqual(10)
    })


    it('forEach with i', () => {

        let acc = 1
        forEach([2, 4, 3], (item, i: number) => {
            acc += i
        })
        expect(acc).toEqual(4)
    })


    it('forEach - Map', () => {

        let acc = 1
        const items = forEach({a: 2, b: 4, c: 3}, (item: number) => {
            acc += item
        })
        expect(items).toEqual({a: 2, b: 4, c: 3})
        expect(acc).toEqual(10)
    })


    it('forEach - with k', () => {

        let acc = 1
        const items = forEach({a: 2, b: 4, c: 3}, (item: number) => {
            acc += item
        })
        expect(items).toEqual({a: 2, b: 4, c: 3})
        expect(acc).toEqual(10)
    })


    it('forEach - Map - curried', () => {

        let acc = 1
        const items = forEach((item: number) => {
            acc += item
        })([2, 4, 3])
        expect(items).toEqual([2, 4, 3])
        expect(acc).toEqual(10)
    })


    it('forEach with i - curried', () => {

        let acc = 1
        forEach((item, i: number) => {
            acc += i
        })([2, 4, 3])
        expect(acc).toEqual(4)
    })


    it('forEach - Map - curried', () => {

        let acc = 1
        const items = forEach((item: number) => {
            acc += item
        })({a: 2, b: 4, c: 3})
        expect(items).toEqual({a: 2, b: 4, c: 3})
        expect(acc).toEqual(10)
    })


    it('forEach - with k - curried', () => {

        let acc = 1
        const items = forEach((item: number) => {
            acc += item
        })({a: 2, b: 4, c: 3})
        expect(items).toEqual({a: 2, b: 4, c: 3})
        expect(acc).toEqual(10)
    })


    it('typing', () => {

        const $1 = forEach((_: number) => _ * 2)([1,2,3])
        expectType<Array<number>>($1)

        const $2 = forEach((_: number) => {})({a: 1, b: 2})
        expectType<Map<number>>($2)
        const $3: Expect<Map<number>,typeof $2> = true

        const $36 = forEach((x: string) => true)([1, 2])
        const $37: void = $36
        //const $38: undefined = $36 // should be impossible
    })


    // TODO test keys passed to f, curried as well as uncurried, with maps and arrays
})
