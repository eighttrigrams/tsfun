import {asyncReduce} from '../../src/arraylist';


describe('asyncReduce', () => {


    it('asyncReduce', async done => {

        const asyncSum = asyncReduce((acc, val: number) => Promise.resolve(acc + val), 0);

        const sum = await asyncSum([1, 3, 7]);
        expect(sum).toBe(11);
        done();
    });
});