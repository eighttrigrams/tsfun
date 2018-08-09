import {intersectMap, subtractMap, unionMap, uniteMap} from '../../src/maps/set_like';


export function main() {

    describe('Maps/Set-Like-Collection', () => {

        it('subtractMap - subtract by array of numeric keys', () =>
            expect(subtractMap([1])({1: 3, 2: 4}))
                .toEqual({2: 4}));


        it('subtractMap - subtract by array of string keys', () =>
            expect(subtractMap(['1'])({1: 3, 2: 4}))
                .toEqual({2: 4}));


        it('subtractMap - subtract objects', () =>
            expect(subtractMap({1: 7})({1: 3, 2: 4}))
                .toEqual({2: 4}));


        it('subtractMap - array for o', () =>
            expect(() => subtractMap({0: 7})([2, 4]))
                .toThrow(new TypeError('invalid argument')));


        it('subtractMap - retain instance', () => {
            const instance = { a: 'hey'  };
            expect(subtractMap({1: 7})({1: 3, 2: instance})['2'])
                .toBe(instance);
        });


        it('uniteMap - overwrite', () =>
            expect(uniteMap({1: 4})({1: 3, 2: 4}))
                .toEqual({1: 4, 2: 4}));


        it('uniteMap - unite different', () =>
            expect(uniteMap({1: 4})({2: 4}))
                .toEqual({1: 4, 2: 4}));


        it('uniteMap - illegal first arg', () =>
            expect(() => uniteMap([])({2: 4}))
                .toThrow(new TypeError('invalid argument')));


        it('uniteMap - illegal second arg', () =>
            expect(() => uniteMap({1: 4})([]))
                .toThrow(new TypeError('invalid argument')));


        it('uniteMap - retain instance', () => {
            const instance = { a: 'hey'  };
            expect(uniteMap({1: 4})({1: 3, 2: instance})[2])
                .toBe(instance);
        });


        it('uniteMap - variadic', () =>
            expect(uniteMap(...[{3: 4}, {4: 4}])({1: 2}))
                .toEqual({1: 2, 3: 4, 4: 4}));


        it('uniteMap - variadic', () =>
            expect(uniteMap(...[{3: 4}, {4: 4}])({1: 2}))
                .toEqual({1: 2, 3: 4, 4: 4}));


        it('unionMap', () =>
            expect(unionMap([{3: 4}, {4: 4}, {1: 2}]))
                .toEqual({1: 2, 3: 4, 4: 4}));


        it('unionMap - one', () =>
            expect(unionMap([{3: 4}]))
                .toEqual({3: 4}));


        it('unionMap - empty', () =>
            expect(unionMap([]))
                .toEqual({}));


        it('intersectMap', () =>
            expect(intersectMap({1: 4})({1: 3, 2: 4}))
                .toEqual({1: 4}));


        it('intersectMap - array', () =>
            expect(intersectMap([1])({1: 3, 2: 4}))
                    .toEqual({1: 3}));


        it('intersect Map- array for o', () =>
            expect(
                () => intersectMap({1: 3, 2: 4})([1]))
                .toThrow(new TypeError('invalid argument')));


        it('intersectMap - retain instance', () => {
            const instance = { a: 'hey'  };
            expect(
                intersectMap({1: instance})({1: instance, 2: 4})[1]
            ).toBe(instance);
        });
    });
}