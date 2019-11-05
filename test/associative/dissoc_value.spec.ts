import {dissocValue} from '../../src/associative';


describe('dissocValue', () => {

    it('array', () =>
        expect(

            dissocValue(2)([1, 5, 7, 9])

        ).toEqual([1, 5, 9]));


    it('object', () =>
        expect(

            dissocValue('b')({a: 3, b: 7})

        ).toEqual({a: 3}));
});