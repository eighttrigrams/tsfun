import {last} from '../../src/arraylist';


describe('last', () => {

    it('last', () =>
        expect(

            last([4, 5])

        ).toEqual(5));


    it('undefined', () =>
        expect(

            () => last([] as any)

        ).toThrowError());
});