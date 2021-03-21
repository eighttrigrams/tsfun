import { get, path } from "../../../src/struct";


/**
 * tsfun | get
 */
describe('get', () => {

    it('first level object - second level object',() =>
        expect(

            get(path('a.b'))({a: {b: 4}}))

            .toEqual(4))


    it('first level object - second level object - by array',() =>
        expect(

            get(['a','b'])({a: {b: 4}}))

            .toEqual(4))


    it('first level object - second level key missing',() =>
        expect(

            get(path('a.c'), undefined)({a: {b: 4}}))

            .toEqual(undefined))


    it('first level object - second level object - third level key missing',() =>
        expect(

            get(path('a.c.e'), undefined)({a: {c: {c: 7}}}))

            .toEqual(undefined))


    it('first level object key missing - second level object key missing - third level key missing',() =>
        expect(

            get(path('e.e.e'))({c: {c: {c: 7}}}))

            .toEqual(undefined))


    it('getOr - undefined',() =>
        expect(

            get(path('c.d'), undefined)({a: {b: 4}}))

            .toEqual(undefined))


    it('get - alternative',() =>
        expect(

            get(path('c.d'), 8)({a: {b: 4}}))

            .toEqual(8))


    it('wrap - with getElForPathIn and false',() =>
        expect(

            get('a')({a: false}))

            .toEqual(false))


    it('nothing',() =>
        expect(

            get('[3]')([1, 2]))

            .toBeUndefined())


    it('first level object - second level object - see path',() =>
        expect(

            get('a.b')({'a.b': 4}))

            .toEqual(4))


    it('do not return undefined except when specified',() => {
        
        expect(get(0)([0])).toBe(0)
        expect(get(0)([''])).toBe('')
        expect(get(0)([false])).toBe(false)
        expect(get(0)([null])).toBe(null)
        expect(get(0)([undefined])).toBe(undefined)

        expect(get([0,0])([[0]])).toBe(0)
        expect(get([0,0])([['']])).toBe('')
        expect(get([0,0])([[false]])).toBe(false)
        expect(get([0,0])([[null]])).toBe(null)
        expect(get([0,0])([[undefined]])).toBe(undefined)
    })
})
