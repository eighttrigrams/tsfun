import { size } from '../../../src/collection'
import {samesetBy, by, is, jsonEqual, on, onBy} from '../../../src/comparator'
import {isArray, isDefined, isEmpty, isNot, isUndefined, isUndefinedOrEmpty} from '../../../src/predicate'
import {intersectBy} from '../../../src/set'
import { to } from '../../../src/struct'


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
    })


    it('you can also construct more powerful on functions, by giving a comparator which is applied after the path', () => {

        const $on1 = onBy(a => b => a !== b)

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

        ).toEqual([{a: {b: 4}}] as any))


    it('on - with find - isEmpty predicate', () =>
        expect(

            [{a: [1, 2, 4]}, {a: []}]
                .filter(on('a', isEmpty))

        ).toEqual([{a: []}] as any))


    it('on - with find and isNot - isEmpty predicate', () =>
        expect(

            [{a: [1, 2, 4]}, {a: []}]
                .filter(isNot(on('a', isEmpty)))

        ).toEqual([{a: [1, 2, 4]}] as any))


    it('on - with find and isNot - isUndefinedOrEmpty predicate works with undefined', () =>
        expect(

            [{a: [1, 2, 4]}, {a: undefined}]
                .filter(isNot(on('a', isUndefinedOrEmpty)))

        ).toEqual([{a: [1, 2, 4]}] as any))


    it('on - with find and isArray', () =>
        expect(

            [{a: {b: [2, 1]}}, {c: {a: 1}}, {}]
                .filter(on(['a','b'], isArray))

        ).toEqual([{a: {b: [2, 1]}}] as any))

        it('on - with find and isNot - user arrayEquivalent with By when you want to match path', () =>
        expect(

            [{a: {b: [2, 1]}}, {a: {b: [2, 7]}}]
                .filter(onBy(samesetBy(undefined as any))(['a','b'])({a: {b: [1, 2]}}))

        ).toEqual([{a: {b: [2, 1]}}] as any))


        
    it('intersectBy onBy equalTo - symmetric',() => {

        const $on = onBy(jsonEqual)
        const $intersect = intersectBy($on(['a', 'b']))

        expect(

            $intersect
                ([{a: {b: {c: 'e'}}}, {a: {b: 'c'}}])
                ([{a: {b: {c: 'e'}}}]))

            .toEqual([{a: {b: {c: 'e'}}} as any])
    })


    it('find onBy equalTo - symmetric',() => {

        const $on = onBy(jsonEqual)

        expect(

            [{a: {b: {c: 4}}}, {a: {b: {d: 5}}}]
                .find($on(['a','b'])({a: {b: {c: 4}}})))

            .toEqual({a: {b: {c: 4}}} as any)
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
