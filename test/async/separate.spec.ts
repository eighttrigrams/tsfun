import {separate} from '../../src/async';


const asyncSmaller4 = (_: number) => Promise.resolve(_ < 4);


describe('async/separate', () => {

    it('array', async done => {

        expect(

            await separate(asyncSmaller4)([2, 4, 3]))

            .toEqual([[2, 3], [4]]);

        done();
    });


    it('object', async done => {

        expect(

            await separate(asyncSmaller4)({a: 2, b: 4, c: 3}))

            .toEqual([{a: 2, c: 3}, {b: 4}]);

        done();
    });
});
