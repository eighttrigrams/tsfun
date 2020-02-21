import {asyncReduce} from '../../src/async';


describe('asyncReduce', () => {

    it('asyncReduce', async done => {

        const asyncSum = asyncReduce((acc, val: number) => Promise.resolve(acc + val), 0);

        const sum = await asyncSum([1, 3, 7]);
        expect(sum).toBe(11);
        done();
    });


    it('object', async done => {

        expect(
            await asyncReduce((acc: string, b: string, k: string) => Promise.resolve(acc + b + k), '.')({
                a: '3',
                b: '7',
                c: '5'
            }))
            .toBe('.3a7b5c');
        done();
    });
});