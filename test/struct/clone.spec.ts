import { clone, isArray, isObject } from '../..'


/**
 * tsfun | clone
 */
describe('clone', () => {


    it('clone shallow Object', () => {

        const k = clone({a: '1', b: 2})
        expect(k['a']).toBe('1') // string
        expect(k['b']).toBe(2) // number
    })


    it('clone shallow Array', () => {

        const k = clone(['1', 2])
        expect(k[0]).toBe('1') // string
        expect(k[1]).toBe(2) // number
    })


    it('clone string', () => {

        const k = clone('1')
        expect(k).toBe('1')
    })


    it('clone boolean', () => {

        const t = clone(true)
        expect(t).toBe(true)

        const f = clone(false)
        expect(f).toBe(false)
    })


    it('clone number', () => {

        const k = clone(1)
        expect(k).toBe(1)
    })


    it('clone undefined', () => {

        const k = clone(undefined)
        expect(k).toBe(undefined)
    })


    it('clone null', () => {

        const k = clone(null)
        expect(k).toBe(null)
    })


    it('clone empty Array', () => {

        const k = clone([])
        expect(k.length).toBe(0)
        expect(isArray(k)).toBe(true)
    })


    it('clone empty Object', () => {

        const k = clone({})
        expect(Object.keys(k).length).toBe(0)
        expect(isObject(k)).toBe(true)
    })


    it('undefined Array item', () => {

        const k = clone([undefined])
        expect(k.length).toBe(1)
        expect(k[0]).toBe(undefined)
    })


    it('undefined Object item', () => {

        const k = clone({a: undefined})
        expect(Object.keys(k).length).toBe(1)
        expect(k['a']).toBe(undefined)
    })


    it('clone nested Object', () => {

        const nested = {c: 3}
        const k = clone({a: '1', b: nested})
        expect(k['b']['c']).toBe(3)
        expect(k['b']).not.toBe(nested)
    })


    it('clone nested Array', () => {

        const nested = [3]
        const k = clone([nested])
        expect(k[0][0]).toBe(3)
        expect(k[0]).not.toBe(nested)
    })


    it('clone mutually nested Array', () => {

        const nested = [3]
        const k = clone([{a: nested}])
        expect(k[0]['a'][0]).toBe(3)
        expect(k[0]['a']).not.toBe(nested)
    })


    it('clone mutually nested Object', () => {

        const nested = {c: 3}
        const k = clone({a: [nested]})
        expect(k['a'][0]['c']).toBe(3)
        expect(k['a'][0]).not.toBe(nested)
    })


    it('clone function', () => {

        expect(() => clone((() => {}) as any)).toThrow()
    })


    it('clone class instance', () => {

        expect(() => clone(new Date() as any)).toThrow()
    })
})
