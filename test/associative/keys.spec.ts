import {keys} from '../../src/associative';


describe('keys', () => {


    it('object', () =>
        expect(

            keys({a: 3, b: 4})

        ).toEqual(['a', 'b']));


    it('array', () =>
        expect(

            keys(['a', 'b'])

        ).toEqual([0, 1]))
});