import {unionObject, uniteObject} from '../../src/objectset';


describe('unionObject/uniteObject', () => {




    it('overwrite', () =>
        expect(

            uniteObject({1: 4})({1: 3, 2: 4}))

            .toEqual({1: 4, 2: 4}));


    it('unite different', () =>
        expect(

            uniteObject({1: 4})({2: 4}))

            .toEqual({1: 4, 2: 4}));


    it('illegal first arg', () =>
        expect(

            () => uniteObject([])({2: 4}))

            .toThrow(new TypeError('invalid argument')));


    it('illegal second arg', () =>
        expect(

            () => uniteObject({1: 4})([]))

            .toThrow(new TypeError('invalid argument')));


    it('retain instance', () => {

        const instance = { a: 'hey'  };
        expect(uniteObject({1: 4})({1: 3, 2: instance})[2])
            .toBe(instance);
    });


    it('variadic', () =>
        expect(

            uniteObject(...[{3: 4}, {4: 4}])({1: 2}))

            .toEqual({1: 2, 3: 4, 4: 4}));


    it('variadic', () =>
        expect(

            uniteObject(...[{3: 4}, {4: 4}])({1: 2}))

            .toEqual({1: 2, 3: 4, 4: 4}));


    it('unionObject', () =>
        expect(

            unionObject([{3: 4}, {4: 4}, {1: 2}]))

            .toEqual({1: 2, 3: 4, 4: 4}));


    it('one', () =>
        expect(

            unionObject([{3: 4}]))

            .toEqual({3: 4}));


    it('empty', () =>
        expect(

            unionObject([]))

            .toEqual({}));
});
