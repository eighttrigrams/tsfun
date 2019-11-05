import {dissoc} from '../../src/associative';


describe('dissoc', () => {

    it('array', () =>
        expect(

            dissoc(2)([1, 5, 7, 9])

        ).toEqual([1, 5, 9]));


    it('object', () =>
        expect(

            dissoc('b')({a: 3, b: 7})

        ).toEqual({a: 3}));
});