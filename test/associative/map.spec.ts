import {map} from '../../src/associative';
import {to} from '../../src/struct';
import {flow} from '../../src/composition';


/**
 * tsfun | map
 */
describe('map', () => {

    it('map', () => {

        // map works as expected
        expect(

            map(_ => 2 * _, [3, 7])

        ).toEqual([6, 14])

        // but here it works also for the Map type, abstracting over Associative
        expect(

            map(_ => 2 * _, {a: 3, b: 7})

        ).toEqual({a: 6, b: 14})
    });


    it('map - with to and flow', () => {

        // in flow context, two parameter lists are used
        expect(

            map
            (_ => 2 * _)
            ([3, 7])

        ).toEqual([6, 14])
        expect(

            map
            (_ => 2 * _)
            ({a: 3, b: 7})

        ).toEqual({a: 6, b: 14})

        // ->
        expect(

            flow(
                [{a: 1}, {a: 3}],
                map(to('a'))
            )

        ).toEqual([1, 3])
    })


    it('map object', () =>
        expect(

            map(_ => 2 * _)({a: 1, b: 2}))

            .toEqual({a: 2, b: 4}))


    it('array, indexed', () =>
        expect(

            map((v: number, i: number) => v * i)([2, 3, 4]))

            .toEqual([0, 3, 8]))


    it('object, indexed', () =>
        expect(

            map((v: string, pos: string) => pos + v)({a: '1', b: '2'}))

            .toEqual({a: 'a1', b: 'b2'}))
})
