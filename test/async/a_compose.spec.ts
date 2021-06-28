import {aCompose} from '../../src/async';


/**
 * tsfun | aCompose
 */
describe('aCompose', () => {

    it('aCompose', async done => {

        expect(

            await aCompose(
                (itm: any) => new Promise<any>(resolve => setTimeout(() => resolve(itm + 'd'), 50)),
                (itm: any) => itm + 'ee'
            )('abc')

        ).toEqual('abcdee')

        done()
    })
})
