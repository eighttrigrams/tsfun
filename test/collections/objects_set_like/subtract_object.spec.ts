import {subtractObject} from '../../../src/collections/objects_set_like';

describe('subtractObject', () => {

    it('subtract by array of numeric keys', () =>
        expect(

            subtractObject([1])({1: 3, 2: 4}))

            .toEqual({2: 4}));


    it('subtract by array of string keys', () =>
        expect(

            subtractObject(['1'])({1: 3, 2: 4}))

            .toEqual({2: 4}));


    it('subtract objects', () =>
        expect(

            subtractObject({1: 7})({1: 3, 2: 4}))

            .toEqual({2: 4}));


    it('array for o', () =>
        expect(

            () => subtractObject({0: 7})([2, 4]))

            .toThrow(new TypeError('invalid argument')));


    it('retain instance', () => {

        const instance = { a: 'hey'  };
        expect(subtractObject({1: 7})({1: 3, 2: instance})['2'])
            .toBe(instance);
    });
});
