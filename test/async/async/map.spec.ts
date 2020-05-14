import {map as asyncMap /* use an alias if you want to disambiguate */} from '../../../src/async';

/**
 * tsfun | async/map
 */
describe('async/map', () => {

    it('async map over associative', async done => {

        // mapping as usual, but with an async mapping function
        expect(

            await asyncMap(delayedTimes2, [1, 2])

        ).toEqual([2, 4])

        // works for Map, abstracting over Associative
        expect(

            await asyncMap(delayedTimes2, {a: 1, b: 2})

        ).toEqual({a: 2, b: 4})
        done()
    });


    it('multiple param lists for use in composition', async done => {

        expect(await asyncMap(delayedTimes2)([1, 2])).toEqual([2, 4])
        done()
    })


    const delayedTimes2 =
        (_: number) => new Promise<any>(resolve => setTimeout(() => resolve(_ * 2), 50))
})