import {forEach as asyncForEach} from '../../../src/async'


/**
 * tsfun/async | forEach
 */
describe('async/forEach', () => {

    it('array', async done => {

        let acc = 1
        const items = await asyncForEach(async (item: number) => {
            acc += item
        })([2, 4, 3])
        expect(items).toEqual([2, 4, 3])
        expect(acc).toEqual(10)
        done()
    })


    it('array with i', async done => {

        let acc = 1
        await asyncForEach(async (item, i: number) => {
            acc += i
        })([2, 4, 3])
        expect(acc).toEqual(4)
        done()
    })


    it('object with i', async done => {

        let acc = 0
        let ks = ''
        const items = await asyncForEach(async (item: number, k: string) => {
            acc += item
            ks += k
        })({d: 17, e: 19})
        expect(items).toEqual({d: 17, e: 19})
        expect(acc).toEqual(36)
        expect(ks).toEqual('de')
        done()
    })
})
