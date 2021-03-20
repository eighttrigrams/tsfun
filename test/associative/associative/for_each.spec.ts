import {forEach} from '../../../src/associative'


/**
 * tsfun/associative | forEach
 */
describe('forEach', () => {

    it('forEach', () => {

        let acc = 1
        const items = forEach((item: number) => {
            acc += item
        })([2, 4, 3])
        expect(items).toEqual([2, 4, 3])
        expect(acc).toEqual(10)
    })


    it('forEach with i', () => {

        let acc = 1
        forEach((item, i: number) => {
            acc += i
        })([2, 4, 3])
        expect(acc).toEqual(4)
    })


    it('forEach - object', () => {

        let acc = 0
        const items = forEach( (item: number) => {
            acc += item
        })({a: 3, b: 7})

        expect(items).toEqual({a: 3, b: 7})
        expect(acc).toEqual(10)
    })


    it('object, with key', () => {

        let acc = ''
        forEach((item, k: string) => {
            acc += k
        })({a: 3, b: 7})

        expect(acc).toEqual('ab')
    })


    it('single param list', () => {

        let acc = ''
        forEach((item, k: string) => {
            acc += k
        }, {a: 3, b: 7})

        expect(acc).toEqual('ab')
    })


    it('single param list - different order', () => {

        let acc = ''
        forEach({a: 3, b: 7}, (item, k: string) => {
            acc += k
        })

        expect(acc).toEqual('ab')
    })
})
