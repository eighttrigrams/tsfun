import {mcompose, mlift, mmatch, toMaybe} from '../../src/tuple';
import {Maybe} from '../../src/type';
import {cond, flow, throws, val} from '../../src/composition';
import {map} from '../../src/associative';
import {is} from '../../src/comparator';
import {identity} from '../../src/core';


/**
 * tsfun | mlift
 *
 * @author Daniel de Oliveira
 */
describe('mlift', () => {

    const square = (x: number) => x * x;

    it('success', () =>

        expect(

            mlift(val(3))([17])

        ).toEqual([3])
    );


    it('failure', () =>

        expect(

            mlift(throws(3))([19])

        ).toEqual([])
    );


    it('use with mcompose', () =>

        expect(

            map(mcompose(square, mlift(cond(is(1.5), throws(3)))))([[1.5], [0], [2]])

        ).toEqual([[],[0],[4]])
    );
});