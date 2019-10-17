import {values} from '../../src/associative';


describe('values', () => {


    it('object', () =>
        expect(

            values({a: 3, b: 4})

        ).toEqual([3, 4]));


    it('array', () =>
        expect(

            values({a: 3, b: 4})

        ).toEqual([3, 4]));
});