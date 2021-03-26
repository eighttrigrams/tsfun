import {aFlow} from '../../src/async'


/**
 * tsfun/async | aFlow
 */
describe('async/aflow', () => {

    it('asyncFlow', async done => {

        expect(

            await aFlow(
                'abc',
                (itm: any) => new Promise<any>(resolve => setTimeout(() => resolve(itm + 'd'), 50)),
                (itm: any) => itm + 'ee'
            )

        ).toEqual('abcdee')

        done()
    })
})
