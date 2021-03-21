import {forEach1} from '../../../src/associative'


/**
 * tsfun | forEach1
 */
describe('forEach1', () => {

    it('forEach1', () => {

        let acc = 1
        const items = forEach1((item: number) => {
            acc += item
        })([2, 4, 3])
        expect(items).toEqual([2, 4, 3])
        expect(acc).toEqual(10)
    })


    it('forEach1 with i', () => {

        let acc = 1
        forEach1((item, i: number) => {
            acc += i
        })([2, 4, 3])
        expect(acc).toEqual(4)
    })


    it('forEach1 - object', () => {

        let acc = 0
        const items = forEach1( (item: number) => {
            acc += item
        })({a: 3, b: 7})

        expect(items).toEqual({a: 3, b: 7})
        expect(acc).toEqual(10)
    })


    it('object, with key', () => {

        let acc = ''
        forEach1((item, k: string) => {
            acc += k
        })({a: 3, b: 7})

        expect(acc).toEqual('ab')
    })


    it('single param list', () => {

        let acc = ''
        forEach1((item, k: string) => {
            acc += k
        }, {a: 3, b: 7})

        expect(acc).toEqual('ab')
    })


    it('single param list - different order', () => {

        let acc = ''
        forEach1({a: 3, b: 7}, (item, k: string) => {
            acc += k
        })

        expect(acc).toEqual('ab')
    })
})
