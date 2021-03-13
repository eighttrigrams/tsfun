import {hasnt} from '../../src/predicate';

/**
 * tsfun | hasnt
 *
 * @author Daniel de Oliveira
 */
describe('hasnt', () => {

    it('true', () =>
        expect(

            hasnt(['a','c'])({a: {b: 1}}))

            .toEqual(true))


    it('true - path given as array', () =>
        expect(

            hasnt([0, 'a'])([]))

            .toEqual(true))


    it('true - path given as singleton', () =>
        expect(

            hasnt(1)([]))

            .toEqual(true))


    it('false', () =>
        expect(

            hasnt(['a','b'])({a: {b: 1}}))

            .toEqual(false))


    it('false - path given as array', () =>
        expect(

            hasnt([0, 'a'])([{a: '3'}]))

            .toEqual(false))


    it('false - path given as singleton', () =>
        expect(

            hasnt(0)(['a'])

            ).toEqual(false))
})
