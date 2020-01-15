import {forEach} from '../../src/associative';


describe('forEach', () => {


    it('forEach', () => {

        let acc = 1;
        const items = forEach((item: number) => {
            acc += item
        })([2, 4, 3]);
        expect(items).toEqual([2, 4, 3]);
        expect(acc).toEqual(10);
    });


    it('forEach with i', () => {

        let acc = 1;
        forEach((item, i) => {
            acc += i
        })([2, 4, 3]);
        expect(acc).toEqual(4);
    });


    it('forEach - object', () => {

        let acc = 0;
        const items = forEach( (item: number) => {
            acc += item
        })({a: 3, b: 7});

        expect(items).toEqual({a: 3, b: 7});
        expect(acc).toEqual(10);
    });


    it('forEach with i - object', () => {

        let acc = -1;
        forEach((item, i) => {
            acc += i
        })({a: 3, b: 7});

        expect(acc).toEqual(0);
    });
});
