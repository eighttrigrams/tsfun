import {asyncReduce, reduce} from '../../src/arraylist';


describe('reduce / asyncReduce', () => {


    it('reduce', () =>
        expect(

            reduce((b: number, a: number) => b + a, 0)([1, 5, 6]))

            .toBe(12));



    it('asyncReduce', async done => {

        const asyncSum = asyncReduce((acc, val: number) => Promise.resolve(acc + val), 0);

        const sum = await asyncSum([1, 3, 7]);
        expect(sum).toBe(11);
        done();
    });
});