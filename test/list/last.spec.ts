import {last} from '../../src/list';


describe('last', () => {

    it('last', () =>
        expect(

            last([4, 5])

        ).toEqual(5));


    it('undefined', () =>
        expect(

            last([])

        ).toBeUndefined());


    it('string', () =>
        expect(

            last('abc')

        ).toEqual('c'));


    it('string - from empty', () =>
        expect(

            last('')

        ).toBeUndefined());
});