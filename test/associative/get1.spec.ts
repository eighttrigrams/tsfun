import {get_a} from '../../src/associative'


/**
 * tsfun | get_a
 */
describe('get_a', () => {

    it('object',() =>
        expect(

            get_a('a')({a: 'b', c: 'd'}))

            .toEqual('b'))


    it('array',() =>
        expect(

            get_a(0)([1, 2]))

            .toEqual(1))


    it('nothing',() =>
        expect(

            get_a(3)([1, 2]))

            .toBeUndefined())


    it('alternative - from object',() =>
        expect(

            get_a('a', undefined as any)({a: 'b', c: 'd'}))

            .toEqual('b'))

            
    it('alternative',() =>
        expect(

            get_a(0, undefined as any)([1, 2]))

            .toEqual(1))


    it('alternative - undefined',() =>
        expect(

            get_a(3, undefined as any)([1, 2]))

            .toEqual(undefined))


    it('alternative - alternative',() =>
        expect(

            get_a(7, 7)([1, 2]))

            .toEqual(7))
})
