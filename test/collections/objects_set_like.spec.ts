import {
    intersectObject,
    subtractObject,
    unionObject,
    uniteObject
} from '../../src/collections/objects_set_like';


describe('Object/Set-Like-Collection', () => {

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


    it('intersectObject', () =>
        expect(

            intersectObject({1: 4})({1: 3, 2: 4}))

            .toEqual({1: 4}));


    it('array', () =>
        expect(

            intersectObject([1])({1: 3, 2: 4}))

            .toEqual({1: 3}));


    it('intersect Map- array for o', () =>
        expect(

            () => intersectObject({1: 3, 2: 4})([1]))

            .toThrow(new TypeError('invalid argument')));


    it('intersectObject - retain instance', () => {

        const instance = { a: 'hey'  };
        expect(
            intersectObject({1: instance})({1: instance, 2: 4})[1]
        ).toBe(instance);
    });
});
