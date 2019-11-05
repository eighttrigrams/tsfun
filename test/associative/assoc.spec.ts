import {assoc} from '../../src/associative';


describe('assoc', () => {

    it('array', () =>
       expect(

           assoc(3, 8)([1, 5, 7, 9])

       ).toEqual([1, 5, 7, 8]));


    it('object', () =>
        expect(

            assoc('b', 8)({a: 3, b: 7})

        ).toEqual({a: 3, b: 8}));
});