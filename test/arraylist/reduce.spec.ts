import {reduce} from '../../src/arraylist';


describe('reduce', () => {


    it('reduce', () =>
        expect(

            reduce((b: number, a: number) => b + a, 0)([1, 5, 6]))

            .toBe(12));
});