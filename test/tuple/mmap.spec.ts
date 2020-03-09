import {mmap} from '../../src/tuple';
import {Maybe} from '../../src/type';

/**
 * tsfun | mmap
 * monadic map function
 *
 * @author Daniel de Oliveira
 */
describe('mmap', () => {

    const dec = (x: number) => (x-1 === 0 ? [] : [x-1]) as Maybe<number>;

    it('mmap', () =>

        expect(

            mmap(dec)([2])

        ).toEqual([1])
    );

    it('mmap', () =>

        expect(

            mmap(dec)([1])

        ).toEqual([])
    );
});