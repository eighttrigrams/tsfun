import {filter as asyncFilter} from '../../../src/async'


/**
 * tsfun/async | filter
 *
 * asynchronous function for filtering items from Collection by a given predicate
 */
describe('asyncFilter', () => {

    it('array', async done => {

        expect(

            await asyncFilter(asyncSmaller4)([2, 4, 3]))

            .toEqual([2, 3])

        done()
    })


    it('object', async done => {

        expect(

            await asyncFilter(asyncSmaller4)({a: 2, b: 4, c: 3}))

            .toEqual({a: 2, c: 3})

        done()
    })


    it('string', async done => {

        expect(

            await asyncFilter((a: string) => Promise.resolve(a > 'a'))('abad'))

            .toEqual('bd')

        done()
    })


    // typing - see comments in asyncMap typing test
})


const asyncSmaller4 = _ => Promise.resolve(_ < 4)
