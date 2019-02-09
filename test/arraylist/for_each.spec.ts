import {asyncForEach, forEach, forEachRight} from '../../src/arraylist';


describe('forEach / forEachRight / asyncForEach', () => {


    it('forEach', async done => {

        let acc = 1;
        const items = await forEach((item: number) => {
            acc += item
        })([2, 4, 3]);
        expect(items).toEqual([2, 4, 3]);
        expect(acc).toEqual(10);
        done();
    });



    it('forEachRight', async done => {

        let acc = 1;
        const items = await forEachRight((item: number) => {
            acc += item
        })([2, 4, 3]);
        expect(items).toEqual([3, 4, 2]);
        expect(acc).toEqual(10);
        done();
    });


    it('forEach with i', async done => {

        let acc = 1;
        forEach(async (item, i) => {
            acc += i
        })([2, 4, 3]);
        expect(acc).toEqual(4);
        done();
    });


    it('forEachRight with i', async done => {

        let acc = 1;
        forEachRight(async (item, i) => {
            if ((item === 3 && i !== 2)
                || ((item === 4) && i !== 1)
                || ((item === 2) && i !== 0)) {
                fail();
                done();
            }
            acc += i
        })([2, 4, 3]);
        expect(acc).toEqual(4);
        done();
    });


    it('asyncForEach', async done => {

        let acc = 1;
        const items = await asyncForEach(async (item: number) => {
            acc += item
        })([2, 4, 3]);
        expect(items).toEqual([2, 4, 3]);
        expect(acc).toEqual(10);
        done();
    });


    it('asyncForEach with i', async done => {

        let acc = 1;
        await asyncForEach(async (item, i) => {
            acc += i
        })([2, 4, 3]);
        expect(acc).toEqual(4);
        done();
    });
});
