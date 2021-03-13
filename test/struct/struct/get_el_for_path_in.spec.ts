import {getElForPathIn} from '../../../src/struct'


describe('getElForPathIn - internal', () => {

    it('getElForPathIn - returns el', () =>
        expect(

            getElForPathIn({a:{ b: { c: 'a'}}}, 'a.b.c'))

            .toEqual('a'))


    it('getElForPathIn - returns undefined', () =>
        expect(

            getElForPathIn({a:{ }}, 'a.b.c'))

            .toEqual(undefined))


    it('getElForPathIn - does not return undefined on empty string', () =>
        expect(

            getElForPathIn({a: ''}, 'a'))

            .not.toEqual(undefined))


    it('getElForPathIn - does not return undefined on 0', () =>
        expect(

            getElForPathIn({a: 0}, 'a'))

            .not.toEqual(undefined))
})
