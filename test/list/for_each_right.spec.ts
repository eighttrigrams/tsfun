import {forEachRight} from '../../src/list';


describe('forEachRight', () => {


    it('forEachRight', async done => {

        let acc = 1;
        const items = await forEachRight((item: number) => {
            acc += item
        })([2, 4, 3]);
        expect(items).toEqual([2, 4, 3]);
        expect(acc).toEqual(10);
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
});
