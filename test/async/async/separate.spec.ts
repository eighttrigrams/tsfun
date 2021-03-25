import {separate as asyncSeparate} from '../../../src/async'


/**
 * tsfun/async | separate
 *
 * asynchronous function for separating items from Collection by a given Predicate
 */
describe('async/separate', () => {

    const asyncSmaller4 = (_: number) => Promise.resolve(_ < 4)

    it('array', async done => {

        expect(

            await asyncSeparate(asyncSmaller4)([2, 4, 3]))

            .toEqual([[2, 3], [4]])

        done()
    })


    it('object', async done => {

        expect(

            await asyncSeparate(asyncSmaller4)({a: 2, b: 4, c: 3}))

            .toEqual([{a: 2, c: 3}, {b: 4}])

        done()
    })

    // typing - see comments in asyncMap typing test
})
