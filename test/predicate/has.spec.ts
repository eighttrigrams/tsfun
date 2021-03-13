import {has} from '../../src/predicate'

/**
 * tsfun | has
 *
 * also see: Map.prototype.has()
 */
describe('has', () => {

    it('true', () =>
        expect(

            has(['a','b'])({a: {b: 1}}))

            .toEqual(true))


    it('true - path given as number', () =>
        expect(

            has(0)(['a'])

            ).toEqual(true))


    it('true - path given as array', () =>
        expect(

            has([0, 'a'])([{a: '3'}]))

            .toEqual(true))


    it('false', () =>
        expect(

            has(['a','c'])({a: {b: 1}}))

            .toEqual(false))


    it('false - path given as array', () =>
        expect(

            has([0, 'a'])([{b: '3'}]))

            .toEqual(false))


    it('false - path given as number', () =>
        expect(

            has(1)(['a'])

        ).toEqual(false))
})
