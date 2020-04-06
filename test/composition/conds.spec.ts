import {is, jsonEqual, on} from '../../src/comparator';
import {conds, flow, otherwise} from '../../src/composition';
import {to} from '../../src/struct';

/**
 * tsfun | conds
 *       | + otherwise
 *
 * @author Daniel de Oliveira
 */
describe('conds', () => {

    const square = (x: number) => x * x;


    it('first - by function', () =>
        expect(

            conds(
                [is(3), 5],
                [is(5), 6])
            (3)

        ).toEqual(5)
    );


    it('first - by value', () =>
        expect(

            conds(
                [3, 5],
                [5, 6])
            (3)

        ).toEqual(5)
    );


    it('first - square result', () =>
        expect(

            conds(
                [3, square],
                [5, square])
            (3)

        ).toEqual(9)
    );


    it('second - by function', () =>
        expect(

            conds(
                [is(3), 5],
                [is(5), 6])
            (5)

        ).toEqual(6)
    );


    it('second - by value', () =>
        expect(

            conds(
                [3, 5],
                [5, 6])
            (5)

        ).toEqual(6)
    );


    it('otherwise', () =>
        expect(

            conds(
                [is(3), 5],
                [is(5), 6],
                [otherwise, 7])
            (8)

        ).toEqual(7)
    );


    it('default', () =>
        expect(

            () => conds(
                [is(3), 5],
                [is(5), 6])
            (4)

        ).toThrow()
    );


    it('use case', () =>
        expect(

            flow(
                {a: 7},
                conds(
                    [on('a', is(7)), on('a', square)],
                    [jsonEqual({a: 7}), to('a')]))

        ).toEqual(49)
    );
});