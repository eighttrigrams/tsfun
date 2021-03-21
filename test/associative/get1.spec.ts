import {get1} from '../../src/associative'


/**
 * tsfun | get1
 */
describe('get1', () => {

    it('object',() =>
        expect(

            get1('a')({a: 'b', c: 'd'}))

            .toEqual('b'))


    it('array',() =>
        expect(

            get1(0)([1, 2]))

            .toEqual(1))


    it('nothing',() =>
        expect(

            get1(3)([1, 2]))

            .toBeUndefined())


    it('alternative - from object',() =>
        expect(

            get1('a', undefined as any)({a: 'b', c: 'd'}))

            .toEqual('b'))

            
    it('alternative',() =>
        expect(

            get1(0, undefined as any)([1, 2]))

            .toEqual(1))


    it('alternative - undefined',() =>
        expect(

            get1(3, undefined as any)([1, 2]))

            .toEqual(undefined))


    it('alternative - alternative',() =>
        expect(

            get1(7, 7)([1, 2]))

            .toEqual(7))
})
