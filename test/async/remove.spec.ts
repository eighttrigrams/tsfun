import {remove} from '../../src/async';


describe('async/remove', () => {

    it('array', async done => {

        expect(

            await remove((_: any) => Promise.resolve(_ < 4))([2, 4, 3]))

            .toEqual([4]);

        done();
    });


    it('object', async done => {

        expect(

            await remove((_: any) => Promise.resolve(_ < 4))({a: 2, b: 4, c: 3}))

            .toEqual({ b: 4 });

        done();
    });


    it('array with i', async done => {

        expect(

            await remove((_: any, i: number) => Promise.resolve(i === 1))([2, 4, 3]))

            .toEqual([2, 3]);

        done();
    });


    it('object with k', async done => {

        expect(

            await remove((_: any, k: string) => Promise.resolve(k === 'b'))({a: 2, b: 4, c: 3}))

            .toEqual({ a: 2, c: 3 });

        done();
    });
});
