import {last, second} from '../../src/arraylist';


describe('second', () => {

    it('second', () =>
        expect(

            second([4, 5])

        ).toEqual(5));


    it('undefined 1', () =>
        expect(

            second([])

        ).toEqual(undefined));


    it('undefined 2', () =>
        expect(

            second([])

        ).toEqual(undefined));
});