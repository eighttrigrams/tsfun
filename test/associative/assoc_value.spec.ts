import {assocValue} from '../../src/associative';


describe('assocValue', () => {

    it('array', () =>
       expect(

           assocValue(3, 8)([1, 5, 7, 9])

       ).toEqual([1, 5, 7, 8]));


    it('object', () =>
        expect(

            assocValue('b', 8)({a: 3, b: 7})

        ).toEqual({a: 3, b: 8}));
});