import {aFilter} from '../../src/async'


/**
 * tsfun | aFilter
 *
 * asynchronous function for filtering items from Collection by a given predicate
 */
describe('aFilter', () => {

    const delayedSmaller4 =
    _ => new Promise<any>(resolve => setTimeout(() => resolve(_ < 4), 50))


    it('array, multiple argument lists', async done => {

        expect(

            await (await aFilter(delayedSmaller4))([2, 4, 3]))

            .toEqual([2, 3])

        done()
    })


    it('array, multiple argument list', async done => {

        expect(

            await aFilter(delayedSmaller4, [2, 4, 3])

        ).toEqual([2, 3])

        done()
    })


    it('array, multiple argument list, different order', async done => {

        expect(

            await aFilter([2, 4, 3], delayedSmaller4)

        ).toEqual([2, 3])

        done()
    })


    it('object', async done => {

        expect(

            await aFilter(delayedSmaller4, {a: 2, b: 4, c: 3}))

            .toEqual({a: 2, c: 3})

        done()
    })


    // typing - see comments in asyncMap typing test
})
