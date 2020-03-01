import {rest} from '../../src/list';


describe('rest', () => {

    it('rest', () =>
        expect(

            rest([4, 5])

        ).toEqual([5]));


    it('undefined', () =>
        expect(

            rest([])

        ).toEqual([]));


    it('string', () =>
        expect(

            rest('abc')

        ).toEqual('bc'));


    it('string - from empty', () =>
        expect(

            rest('')

        ).toEqual(''));
});