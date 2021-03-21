import {map1} from '../../src/associative';
import {cond, val} from '../../src/composition';
import {greaterThan, includedIn, is} from '../../src/comparator';
import {filter} from '../../src/collection';
import {identity} from '../../src/core';


/**
 * tsfun | cond
 *
 * @author Daniel de Oliveira
 */
describe('cond', () => {

    it('cond', () =>
        expect(
            map1(cond(
                greaterThan(3),
                times(2),
                val(18)))
            ({a: 3, b: 4, c: 5})
        ).toEqual({a: 18, b: 8, c: 10}));


    it('pass through', () =>
        expect(
            map1(cond(
                greaterThan(3),
                times(2)))
            ([3, 4, 5])
        ).toEqual([3, 8, 10]));


    it('boolean', () =>
        expect(
            map1(cond(
                true,
                times(2)))
            ([3, 4, 5])
        ).toEqual([6, 8, 10]));


    it('value', () =>
        expect(
            map1(cond(
                true,
                0))
            ([3, 4, 5])
        ).toEqual([0, 0, 0]));


    it('value on false', () =>
        expect(
            map1(cond(
                is(17),
                identity,
                3))
            ([17, 4, 5])
        ).toEqual([17, 3, 3]));


    it('use with filter', () =>
        expect(
            filter(
                cond(
                    includedIn([-2, 4]),
                    greaterThan(0)))
            ([-2, 4, 5])
        ).toEqual([4, 5]));
});

const times = (x: number) => (y: number) => x * y;