import {compose as asyncCompose} from '../../src/async';


/**
 * tsfun | async/compose
 *
 * @author Daniel de Oliveira
 */
describe('async/compose', () => {

    it('asyncCompose', async done => {

        expect(

            await asyncCompose(
                (itm: any) => new Promise<any>(resolve => setTimeout(() => resolve(itm + 'd'), 50)),
                (itm: any) => itm + 'ee'
            )('abc')

        ).toEqual('abcdee');

        done();
    });
});