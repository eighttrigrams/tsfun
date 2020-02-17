/**
 * @author Daniel de Oliveira
 */
import {asyncFlow} from '../../async';

describe('asyncFlow', () => {

    it('asyncFlow', async done => {

        expect(


            await asyncFlow(
                'abc',
                (itm: any) => new Promise<any>(resolve => setTimeout(() => resolve(itm + 'd'), 50)),
                (itm: any) => itm + 'ee'
            )

        ).toEqual('abcdee');

        done();
    });
});