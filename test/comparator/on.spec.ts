import {arrayEquivalent, by, jsonEqual, on} from '../../src/comparator';
import {empty, isArray, isDefined, isEmpty, isNot, isUndefined, undefinedOrEmpty} from '../../src/predicate';
import {intersectBy} from '../../src/arrayset';


/**
 * Used for ObjectStructs in Arrays
 *
 * @author Daniel de Oliveira
 */
describe('on (by)', () => {

    // on

    it('on - with find - symmetric',() =>
        expect(

            [{a: {b: 4}}, {a: {b: 5}}]
                .find(on('a.b')({a: {b: 5}})))

            .toEqual({a: {b: 5}} as any));


    it('on - with find - exact',() =>
        expect(

            [{a: {b: 4}}, {a: {b: 5}}]
                .find(on('a.b:')(5)))

            .toEqual({a: {b: 5}} as any));


    it('on - with filter and isNot - symmetric', () =>
        expect(

            [{a: {b: 4}}, {a: {b: 5}}]
                .filter(isNot(on('a.b')({a: {b: 5}}))))

            .toEqual([{a: {b: 4}} as any]));


    it('on - with filter and isNot - exact', () =>
        expect(

            [{a: {b: 4}}, {a: {b: 5}}].filter(isNot(on('a.b:')(5))))

            .toEqual([{a: {b: 4}} as any]));


    it('on - with intersectBy - symmetric',() =>
        expect(

            intersectBy(on('a.b'))([{a: {b: 4}}, {a: {b: 5}}])
            ([{a: {b: 5}}]))

            .toEqual([{a: {b: 5}} as any]));


    it('on - with find - isUndefined predicate', () =>
        expect(

            [{a: {b: 4}}, {a: {c: 5}}]
                .filter(on('a.b', isUndefined))

        ).toEqual([{a: {c: 5}}] as any));


    it('on - with find and isNot - isUndefined predicate', () =>
        expect(

            [{a: {b: 4}}, {a: {c: 5}}]
                .filter(isNot(on('a.b', isUndefined)))

        ).toEqual([{a: {b: 4}}] as any));


    it('on - with find - isDefined predicate', () =>
        expect(

            [{a: {b: 4}}, {a: {c: 5}}]
                .filter(on('a.b', isDefined))

        ).toEqual([{a: {b: 4}}] as any));


    it('on - with find - isEmpty predicate', () =>
        expect(

            [{a: [1, 2, 4]}, {a: []}]
                .filter(on('a', isEmpty))

        ).toEqual([{a: []}] as any));


    it('on - with find and isNot - isEmpty predicate', () =>
        expect(

            [{a: [1, 2, 4]}, {a: []}]
                .filter(isNot(on('a', empty)))

        ).toEqual([{a: [1, 2, 4]}] as any));


    it('on - with find and isNot - isUndefinedOrEmpty predicate works with undefined', () =>
        expect(

            [{a: [1, 2, 4]}, {a: undefined}]
                .filter(isNot(on('a', undefinedOrEmpty)))

        ).toEqual([{a: [1, 2, 4]}] as any));


    // it('on - with find and isNot - isUndefinedOrEmpty predicate works with undefined', () =>
    //     expect(
    //
    //         [{a: [1, 2, 4]}, {b: undefined}] <- make that work with path not matching
    //             .filter(isNot(on('a')(isUndefinedOrEmpty)))
    //
    //     ).toEqual([{a: [1, 2, 4]}] as any));


    it('on - with find and isNot - partial arrayEquivalent as predicate, without path match', () =>
        expect(

            [{a: {b: [2, 1]}}, {a: {b: [2, 7]}}]
                .filter(on('a.b:', arrayEquivalent)([1, 2]))

        ).toEqual([{a: {b: [2, 1]}}] as any));


    it('on - with find and isArray', () =>
        expect(

            [{a: {b: [2, 1]}}, {c: {a: 1}}, {}]
                .filter(on('a.b', isArray))

        ).toEqual([{a: {b: [2, 1]}}] as any));


    // onBy

    it('on - with find and isNot - user arrayEquivalent with By when you want ot match path', () =>
        expect(

            [{a: {b: [2, 1]}}, {a: {b: [2, 7]}}]
                .filter(on('a.b', arrayEquivalent)({a: {b: [1, 2]}}))

        ).toEqual([{a: {b: [2, 1]}}] as any));


    it('intersectBy onBy equalTo - symmetric',() =>
        expect(

            intersectBy(on('a.b', by(jsonEqual)))([{a: {b: {c: 'e'}}}, {a: {b: 'c'}}])
            ([{a: {b: {c: 'e'}}}]))

            .toEqual([{a: {b: {c: 'e'}}} as any]));


    it('find onBy equalTo - exact',() =>
        expect(

            [{a: {b: 4}}, {a: {b: 5}}]
                .find(on('a.b:', jsonEqual)(5)))

            .toEqual({a: {b: 5}} as any));


    it('find onBy equalTo - symmetric',() =>
        expect(

            [{a: {b: {c: 4}}}, {a: {b: {d: 5}}}]
                .find(on('a.b', jsonEqual)({a: {b: {c: 4}}})))

            .toEqual({a: {b: {c: 4}}} as any));
});