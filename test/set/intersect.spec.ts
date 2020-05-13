import {intersect} from "../../src/set";

/**
 * tsfun | intersect
 */
describe('intersect', () => {

    it('array',() =>
        expect(

            intersect([1,2], [2,4]))

            .toEqual([2]))


    it('string',() =>
        expect(

            intersect('12', '24'))

            .toEqual('2'))


    it('multiple arguments in single parameter list',() => {

        expect(

            intersect([1,2],[2,4],[2,3]))

            .toEqual([2])

        expect(

            intersect('12','24','23'))

            .toEqual('2')
    })


    it('multiple parameter lists',() => {

        expect(

            intersect('12')('24'))

            .toEqual('2')

        expect(

            intersect([1,2])([2,4]))

            .toEqual([2])
    })

    // err cases

    it('illegal arguments', () => {

        expect(

            () => intersect()

        ).toThrow('illegal argument - intersect expects at least one argument in first parameter list')
    })
})
