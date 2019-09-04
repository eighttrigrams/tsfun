import {forEach} from '../../src/arraylist';


describe('forEach', () => {


    it('forEach', async done => {

        let acc = 1;
        const items = await forEach((item: number) => {
            acc += item
        })([2, 4, 3]);
        expect(items).toEqual([2, 4, 3]);
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
});
