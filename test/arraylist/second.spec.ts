import {last, second} from '../../src/arraylist';


describe('second', () => {

    it('second', () =>
        expect(

            second(["33", 5])

        ).toEqual(5));


    it('undefined 1', () =>
        expect(

            () => second([] as any)

        ).toThrowError("Illegal argument: Pair expected"));
});