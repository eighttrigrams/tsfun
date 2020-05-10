import {map as asyncMap} from '../../src/async';

/**
 * tsfun | async/map
 */
describe('async/map', () => {

    const asyncTimes2 =
        (_: number) => Promise.resolve(_ * 2)
    const asyncTimes2WithTimeout =
        (_: number) => new Promise<any>(resolve => setTimeout(() => resolve(_ * 2), 50))


    it('array', async done => {

        expect(await asyncMap(asyncTimes2WithTimeout)([1, 2])).toEqual([2, 4])
        expect(await asyncMap(asyncTimes2WithTimeout, [1, 2])).toEqual([2, 4])
        done()
    });


    it('object', async done => {

        expect(

            await asyncMap(asyncTimes2)({a: 1, b: 2}))

            .toEqual({a: 2, b: 4})

        done()
    })
})