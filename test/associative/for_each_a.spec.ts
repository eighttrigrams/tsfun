import {forEach_a} from '../../src/associative'


/**
 * tsfun | forEach_a
 */
describe('forEach_a', () => {

    it('forEach_a', () => {

        let acc = 1
        const items = forEach_a((item: number) => {
            acc += item
        })([2, 4, 3])
        expect(items).toEqual([2, 4, 3])
        expect(acc).toEqual(10)
    })


    it('forEach_a with i', () => {

        let acc = 1
        forEach_a((item, i: number) => {
            acc += i
        })([2, 4, 3])
        expect(acc).toEqual(4)
    })


    it('forEach_a - object', () => {

        let acc = 0
        const items = forEach_a( (item: number) => {
            acc += item
        })({a: 3, b: 7})

        expect(items).toEqual({a: 3, b: 7})
        expect(acc).toEqual(10)
    })


    it('object, with key', () => {

        let acc = ''
        forEach_a((item, k: string) => {
            acc += k
        })({a: 3, b: 7})

        expect(acc).toEqual('ab')
    })


    it('single param list', () => {

        let acc = ''
        forEach_a((item, k: string) => {
            acc += k
        }, {a: 3, b: 7})

        expect(acc).toEqual('ab')
    })


    it('single param list - different order', () => {

        let acc = ''
        forEach_a({a: 3, b: 7}, (item, k: string) => {
            acc += k
        })

        expect(acc).toEqual('ab')
    })
})
