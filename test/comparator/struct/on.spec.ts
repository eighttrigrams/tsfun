import {samesetBy, is, jsonEqual, on, onBy, isnt, lessThan} from '../../../src/comparator'
import { identity } from '../../../src/core'
import {isArray, isDefined, isEmpty, isNot, isUndefined, isUndefinedOrEmpty} from '../../../src/predicate'
import {intersectBy} from '../../../src/set'


/**
 * tsfun | on
 */
describe('on', () => {

    const count = (_: Array<any>) => _.length


    it('on lets you compare things along a given path', () => {

        expect(
            on(1, is(7))([4, 7]))
            .toEqual(true)

        expect(
            on(1, is(4))([4, 7]))
            .toEqual(false)

        expect(
            on('a', is(3))({ a: 3 }))
            .toEqual(true)

        expect(
            on('a', is(4))({ a: 3 }))
            .toEqual(false)

        expect(
            on([1, 1], is(7))([3, [2, 7]]))
            .toEqual(true)

        expect(
            on(['a', 'b'], is(3))({ a: { b: 3 }}))
            .toEqual(true)

        expect(
            on(['a',1], is(3))({ a: [7, 3]}))
            .toEqual(true)

        expect(
            on(count, is(2))([4, 7]))
            .toEqual(true)

        // a mapping can be used instead of a path; its result is the basis for comparison
        expect(
            on(count, is(3))([4, 7]))
            .toEqual(false)

        // use case, for more see section "use cases"
        expect(
            [[2,4],[2,4,6]].filter(on(count, is(3))))
            .toEqual([[2,4,6]])
    })


    it('there is a symmetric use case, where items get compared along the given path', () => {

        expect(
            on(1)([4, 7])([4, 7]))
            .toEqual(true)

        expect(
            on(1)([7, 4])([4, 7]))
            .toEqual(false)

        expect(
            on('a')({a: 3})({a: 3}))
            .toEqual(true)

        expect(
            on('a')({a: 4})({a: 3}))
            .toEqual(false)

        // a mapping can be used instead of a path; its result is the basis for comparison
        expect(
            on(count)([4, 7])([5,7]))
            .toEqual(true)

        // use case, for more see section "use cases"
        expect(
            [{a: 3},{a: 4}].filter(on('a')({a: 4})))
            .toEqual([{a: 4}])


        // One can pass down another comparator, which applies after the path or mapping
        expect(
            on('a', isnt)({a: 8})({a: 9}))
            .toBe(true)

        expect(
            on('a', isnt)({a: 8})({a: 8}))
            .toBe(false)

        expect(
            on(count, isnt)([1, 2, 3])([1, 2]))
            .toBe(true)

        expect(
            on(count, is)([1, 2])([1, 2]))
            .toBe(true)

        // One use case would be to write this
        // expect(
            // on(count, lessThan(3))([1, 2]))
            // .toBe(true)

        // which can be expressed in terms of another data structure of the same time

        // expect(
            // on(count, lessThan)([1, 2, 3])([1, 2]))
            // .toBe(true)

        // As the next examples show, passing comparators to yield comparators
        // for symmetric comparisons can also be achieved on a less ad-hoc basis.
    })


    it('you can also construct more powerful on functions, by giving a comparator which is applied after the path', () => {

        const $on1 = onBy(isnt)

        expect(
            $on1('a')({a: 4})({a: 3}))
            .toEqual(true)

        expect(
            $on1('a')({a: 4})({a: 4}))
            .toEqual(false)


        const $on2 = onBy(on('b'))

        expect(
            $on2('a')({a: {b: 3, c: 5}})({a: { b: 3, c: 7}}))
            .toEqual(true)

        expect(
            $on2('a')({a: {b: 3, c: 7}})({a: { b: 4, c: 7}}))
            .toEqual(false)


        // combine a mapping path with onBy
        const $on3 = onBy<any,any>(on(count))

        expect(
            $on3('a')({a: [3, 3]})({a: [3, 4]}))
            .toEqual(true)

        expect(
            $on3('a')({a: [3, 3, 3]})({a: [3, 4]}))
            .toEqual(false)


        // see also this, where a custom on is combined with a path mapping
        expect(
            $on1(JSON.stringify)({a: 3})({a: 4}))
            .toEqual(true)

        expect(
            $on1(JSON.stringify)({a: 3})({a: 3}))
            .toEqual(false)


        // Note that there is no option like $on1('a', is(3) <- this here),
        // because we already have baked in a comparator.
        // However, see the next example.
    })


    it('one can also directly compare to values', () => {

        // Where one might prefer for readability do this
        expect(
            on('a', is(3))({a: 3}))
            .toBe(true)

        // one also can do this directly like this

        expect(
            on('a', 3)({a: 3}))
            .toBe(true)

        expect(
            on('a', 4)({a: 3}))
            .toBe(false)

        expect(
            on(['a','b'], 3)({a: {b: 3}}))
            .toBe(true)

        expect(
            on(count, 2)([2, 3]))
            .toBe(true)



        // This of course not only works, but is especially useful with customized on
        const differentOn = onBy(a => b => a !== b)
        const from = identity

        expect(
            differentOn(0, from(3))([3,8]))
            .toBe(false)

        expect(
            differentOn(0, from(3))([4,8]))
            .toBe(true)

        expect(
            differentOn(count, from(3))([2, 3]))
            .toBe(true)

        expect(
            differentOn(count, from(2))([2, 3]))
            .toBe(false)

        expect(
            differentOn(['a', 'b'], from(3))({a: {b: 4 }}))
            .toBe(true)

        expect(
            differentOn(['a', 'b'], from(4))({a: {b: 4 }}))
            .toBe(false)
    })


    // use cases

    it('on - with find - symmetric',() =>
        expect(

            [{a: {b: 4}}, {a: {b: 5}}]
                .find(on(['a','b'])({a: {b: 5}})))

            .toEqual({a: {b: 5}} as any))


    it('on - with filter and isNot - symmetric', () =>
        expect(

            [{a: {b: 4}}, {a: {b: 5}}]
                .filter(isNot(on(['a','b'])({a: {b: 5}}))))

            .toEqual([{a: {b: 4}} as any]))


    it('on - with intersectBy - symmetric',() =>
        expect(

            intersectBy(on(['a', 'b']))([{a: {b: 4}}, {a: {b: 5}}])
            ([{a: {b: 5}}]))

            .toEqual([{a: {b: 5}} as any]))


    it('on - with find - isUndefined predicate', () =>
        expect(

            [{a: {b: 4}}, {a: {c: 5}}]
                .filter(on(['a','b'], isUndefined))

        ).toEqual([{a: {c: 5}}] as any))


    it('on - with find and isNot - isUndefined predicate', () =>
        expect(

            [{a: {b: 4}}, {a: {c: 5}}]
                .filter(isNot(on(['a','b'], isUndefined)))

        ).toEqual([{a: {b: 4}}] as any))


    it('on - with find - isDefined predicate', () =>
        expect(

            [{a: {b: 4}}, {a: {c: 5}}]
                .filter(on(['a','b'], isDefined))

        ).toEqual([{a: {b: 4}}]))


    it('on - with find - isEmpty predicate', () =>
        expect(

            [{a: [1, 2, 4]}, {a: []}]
                .filter(on('a', isEmpty))

        ).toEqual([{a: []}]))


    it('on - with find and isNot - isEmpty predicate', () =>
        expect(

            [{a: [1, 2, 4]}, {a: []}]
                .filter(isNot(on('a', isEmpty)))

        ).toEqual([{a: [1, 2, 4]}]))


    it('on - with find and isNot - isUndefinedOrEmpty predicate works with undefined', () =>
        expect(

            [{a: [1, 2, 4]}, {a: undefined}]
                .filter(isNot(on('a', isUndefinedOrEmpty)))

        ).toEqual([{a: [1, 2, 4]}]))


    it('on - with find and isArray', () =>
        expect(

            [{a: {b: [2, 1]}}, {c: {a: 1}}, {}]
                .filter(on(['a','b'], isArray))

        ).toEqual([{a: {b: [2, 1]}}]))

        it('on - with find and isNot - user arrayEquivalent with By when you want to match path', () =>
        expect(

            [{a: {b: [2, 1]}}, {a: {b: [2, 7]}}]
                .filter(onBy(samesetBy(undefined as any))(['a','b'])({a: {b: [1, 2]}}))

        ).toEqual([{a: {b: [2, 1]}}]))


    it('intersectBy onBy equalTo - symmetric',() => {

        const $on = onBy(jsonEqual)
        const $intersect = intersectBy($on(['a', 'b']))

        expect(

            $intersect
                ([{a: {b: {c: 'e'}}}, {a: {b: 'c'}}])
                ([{a: {b: {c: 'e'}}}]))

            .toEqual([{a: {b: {c: 'e'}}}])
    })


    it('find onBy equalTo - symmetric',() => {

        const $on = onBy(jsonEqual)

        expect(

            [{a: {b: {c: 4}}}, {a: {b: {d: 5}}}]
                .find($on(['a','b'])({a: {b: {c: 4}}})))

            .toEqual({a: {b: {c: 4}}})
    })


    // resiliency

    it('unknown object key', () =>
        expect(

            on(['a','b'], is(15))({ c: { a: 1 }}))

            .toEqual(false))

    it('unknown array key', () =>
        expect(

            on([10,'a'], is(15))([7, 19, { a: 3 }]))

            .toEqual(false))


    it('unknown object key', () =>
        expect(

            on('a', is(15))({ b: 10 }))

            .toEqual(false))


    it('is not an object', () =>
        expect(

            on(['a',3], is(15))([]))

            .toEqual(false))


    it('is not an array', () =>
        expect(

            on([10,'a'], is(15))({ a: 'b' }))

            .toEqual(false))


    // regression prevention

    it('object - see path',() =>
        expect(

            on('a.b', is(3))({ 'a.b': 3 }))

            .toEqual(true))


    it('first level array - second level object',() =>
        expect(

            on([1,'a'], is(15))([7, { a: 15 }]))

            .toEqual(true))


    it('first level object - second level object - third level array',() =>
        expect(

            on(['a','b',1], is(3))({ a: { b: [7, 3]}}))

            .toEqual(true))


    it('first level array - second level array - third level object',() =>
        expect(

            on([1,1,'a'], is(3))([ 0, [ 3, { a: 3 }]]))

            .toEqual(true))


    it('first level array - second level object - third level object',() =>
        expect(

            on([1,'a',1], is(3))([ 0, { a: [1, 3] }]))

            .toEqual(true))


    it('first level object - second level array - third level object',() =>
        expect(

            on(['a',1,'a'], is(3))({ a: [1, { a: 3 }]}))

            .toEqual(true))


    // it('on - with find and isNot - isUndefinedOrEmpty predicate works with undefined', () =>
    //     expect(
    //
    //         [{a: [1, 2, 4]}, {b: undefined}] <- make that work with path not matching
    //             .filter(isNot(on('a')(isUndefinedOrEmpty)))
    //
    //     ).toEqual([{a: [1, 2, 4]}] as any))


    // it('on - with find and isNot - partial arrayEquivalent as predicate, without path match', () =>
    //     expect(
    //
    //         [{a: {b: [2, 1]}}, {a: {b: [2, 7]}}]
    //             .filter(on('a.b:', arrayEquivalent)([1, 2]))
    //
    //     ).toEqual([{a: {b: [2, 1]}}] as any))
})
