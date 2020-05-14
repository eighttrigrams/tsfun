import {update} from '../../../src/associative';


describe('update', () => {

    it('array', () =>
        expect(

            update(3, (x: number) => x + 1)([1, 5, 7, 9])

        ).toEqual([1, 5, 7, 10]));


    it('object', () =>
        expect(

            update('b', (x: number) => x + 1)({a: 3, b: 7})

        ).toEqual({a: 3, b: 8}));
});