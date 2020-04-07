import {shorterThan} from '../../../src/comparator';

/**
 * tsfun | shorterThan
 *
 * @author Daniel de Oliveira
 */
describe('shorterThan', () => {

    it('string', () =>
        expect(

            shorterThan('abceea')('dae')

        ).toEqual(true));


    it('array', () =>
        expect(

            shorterThan([1, 6, 7])([7, 9])

        ).toEqual(true));


    it('list', () =>
        expect(

            shorterThan([1, 6, 7])('ab')

        ).toEqual(true));
});