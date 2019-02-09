import {subtractObj} from '../../src/objectset';

describe('subtractObj', () => {

    it('subtract by array of numeric keys', () =>
        expect(

            subtractObj([1])({1: 3, 2: 4}))

            .toEqual({2: 4}));


    it('subtract by array of string keys', () =>
        expect(

            subtractObj(['1'])({1: 3, 2: 4}))

            .toEqual({2: 4}));


    it('subtract objects', () =>
        expect(

            subtractObj({1: 7})({1: 3, 2: 4}))

            .toEqual({2: 4}));


    it('array for o', () =>
        expect(

            () => subtractObj({0: 7})([2, 4]))

            .toThrow(new TypeError('invalid argument')));


    it('retain instance', () => {

        const instance = { a: 'hey'  };
        expect(subtractObj({1: 7})({1: 3, 2: instance})['2'])
            .toBe(instance);
    });
});
