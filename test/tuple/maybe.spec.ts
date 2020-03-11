import {maybe} from '../../src/tuple';


describe('maybe', () => {

    it('maybe', () =>
        expect(

            maybe(4)

        ).toEqual([4]));


    it('typing', () => {

        const e1  = maybe(4);
        e1[0] = 3;

        // wrong - e1[0] = 'abc'
    });
});