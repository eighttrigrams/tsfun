import {intersectObject, subtractObject, unionObject, uniteObject} from '../../src/collections/objects_set_like';


export function main() {

    describe('Maps/Set-Like-Collection', () => {

        it('subtractMap - subtract by array of numeric keys', () =>
            expect(

                subtractObject([1])({1: 3, 2: 4}))

                .toEqual({2: 4}));


        it('subtractMap - subtract by array of string keys', () =>
            expect(

                subtractObject(['1'])({1: 3, 2: 4}))

                .toEqual({2: 4}));


        it('subtractMap - subtract objects', () =>
            expect(

                subtractObject({1: 7})({1: 3, 2: 4}))

                .toEqual({2: 4}));


        it('subtractMap - array for o', () =>
            expect(

                () => subtractObject({0: 7})([2, 4]))

                .toThrow(new TypeError('invalid argument')));


        it('subtractMap - retain instance', () => {

            const instance = { a: 'hey'  };
            expect(subtractObject({1: 7})({1: 3, 2: instance})['2'])
                .toBe(instance);
        });


        it('uniteMap - overwrite', () =>
            expect(

                uniteObject({1: 4})({1: 3, 2: 4}))

                .toEqual({1: 4, 2: 4}));


        it('uniteMap - unite different', () =>
            expect(

                uniteObject({1: 4})({2: 4}))

                .toEqual({1: 4, 2: 4}));


        it('uniteMap - illegal first arg', () =>
            expect(

                () => uniteObject([])({2: 4}))

                .toThrow(new TypeError('invalid argument')));


        it('uniteMap - illegal second arg', () =>
            expect(

                () => uniteObject({1: 4})([]))

                .toThrow(new TypeError('invalid argument')));


        it('uniteMap - retain instance', () => {

            const instance = { a: 'hey'  };
            expect(uniteObject({1: 4})({1: 3, 2: instance})[2])
                .toBe(instance);
        });


        it('uniteMap - variadic', () =>
            expect(

                uniteObject(...[{3: 4}, {4: 4}])({1: 2}))

                .toEqual({1: 2, 3: 4, 4: 4}));


        it('uniteMap - variadic', () =>
            expect(

                uniteObject(...[{3: 4}, {4: 4}])({1: 2}))

                .toEqual({1: 2, 3: 4, 4: 4}));


        it('unionMap', () =>
            expect(

                unionObject([{3: 4}, {4: 4}, {1: 2}]))

                .toEqual({1: 2, 3: 4, 4: 4}));


        it('unionMap - one', () =>
            expect(

                unionObject([{3: 4}]))

                .toEqual({3: 4}));


        it('unionMap - empty', () =>
            expect(

                unionObject([]))

                .toEqual({}));


        it('intersectMap', () =>
            expect(

                intersectObject({1: 4})({1: 3, 2: 4}))

                .toEqual({1: 4}));


        it('intersectMap - array', () =>
            expect(

                intersectObject([1])({1: 3, 2: 4}))

                .toEqual({1: 3}));


        it('intersect Map- array for o', () =>
            expect(

                () => intersectObject({1: 3, 2: 4})([1]))

                .toThrow(new TypeError('invalid argument')));


        it('intersectMap - retain instance', () => {

            const instance = { a: 'hey'  };
            expect(
                intersectObject({1: instance})({1: instance, 2: 4})[1]
            ).toBe(instance);
        });
    });
}