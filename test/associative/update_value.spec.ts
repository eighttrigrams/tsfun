import {updateValue} from '../../src/associative';


describe('updateValue', () => {

    it('array', () =>
        expect(

            updateValue(3, (x: number) => x + 1)([1, 5, 7, 9])

        ).toEqual([1, 5, 7, 10]));


    it('object', () =>
        expect(

            updateValue('b', (x: number) => x + 1)({a: 3, b: 7})

        ).toEqual({a: 3, b: 8}));
});