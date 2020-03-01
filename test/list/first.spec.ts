import {first} from '../../src/list';


describe('first', () => {

    it('first', () =>
        expect(

            first([4, 5])

        ).toEqual(4));


    it('undefined', () =>
        expect(

            first([])

        ).toBeUndefined());


    it('string', () =>
        expect(

            first('abc')

        ).toEqual('a'));


    it('string - from empty', () =>
        expect(

            first('')

        ).toBeUndefined());
});