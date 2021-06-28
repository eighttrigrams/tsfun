import {equal, samemap, sameset} from '../../../src/comparator'

/**
 * tsfun | samemap
 */
describe('samemap', () => {

    it('base case', () => {

        expect(
            samemap({a: 1, b: 2}, {b: 2, a: 1})
        ).toEqual(true)
        expect(
            samemap({a: 1}, {a: 2})
        ).toEqual(false)
        expect(
            samemap({a: 1}, {c: 1})
        ).toEqual(false)

        // curried

        expect(
            samemap({a: 1, b: 2})({b: 2, a: 1})
        ).toEqual(true)
        expect(
            samemap({a: 1}, {a: 2})
        ).toEqual(false)
    })


    it('elements get compared via === by default', () => {

        const a = {a: 3}
        const b = {b: 4}

        expect(
            samemap({a: {a: 3}, b: {b: 4}}, {a: {a: 3}, b: {b: 4}})
        ).toEqual(false)
        expect(
            samemap({a: a, b: b}, {a: a, b: b})
        ).toEqual(true)
    })


    it('choose another comparator', () => {

        expect(
            samemap(sameset, {a: [2, 1], b: []}, {b: [], a: [1, 2]})   // uncurried
        ).toEqual(true)

        expect(
            samemap(sameset, {a: [2, 1], b: []})({b: [], a: [1, 2]})   // curried
        ).toEqual(true)

        expect(
            samemap(sameset)({a: [2, 1], b: []})({b: [], a: [1, 2]}) // fully curried
        ).toEqual(true)
    })


    it('left side less keys', () =>
        expect(

            samemap({a: 1})({b: 2, a: 1})

        ).toEqual(false))


    it('right side less keys', () =>
        expect(

            samemap({a: 1, b: 2})({a: 1})

        ).toEqual(false))


    it('different values in different order', () =>
        expect(

            samemap({a: 1, b: 2})({b: 3, a: 1})

        ).toEqual(false))


    xit('mutual default nesting, order matters in arrays, but not for keys', () =>
        expect(

            samemap(equal)
            ({a: [2, {b: 4, a: [1, {f: [1, 2], e: 7}]}], c: 5})
            ({c: 5, a: [2, {a: [1, {e: 7, f: [1, 2]}], b: 4}]})

        ).toEqual(true))
})
