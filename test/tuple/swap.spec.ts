import {swap} from '../../src/tuple';
import {Pair} from '../../src/type';


describe('swap', () => {

    it('swap', () =>
        expect(

            swap([33, '3'])

        ).toEqual(['3', 33]));


    it('swap typing', () => {

        const p1: Pair<string, number> = ['a', 2];
        const p2: Pair<number, string> = swap(p1);

        // wrong
        // const p2: Pair<string, number> = swap(p1);
    })
});