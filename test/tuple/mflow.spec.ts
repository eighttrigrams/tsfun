import {mflow, mval} from '../../src/tuple';
import {Maybe} from '../../src/type';


/**
 * tsfun | mflow
 * monadic flow function
 *
 * @author Daniel de Oliveira
 */
describe('mflow', () => {

    const dec = (x: number) => (x-1 === 0 ? [] : [x-1]) as Maybe<number>;
    const add = (x: number, y: number) => x + y;

    it('mflow - success', () =>

        expect(

            mflow(add, 0, mval(3), mval(3))

        ).toEqual([6])
    );


    it('mflow - use previous value', () =>

        expect(

            mflow(add, 3, dec, dec)

        ).toEqual([3])
    );


    it('mflow - failure', () =>

        expect(

            mflow(add, 2, dec, dec)

        ).toEqual([])
    );
});