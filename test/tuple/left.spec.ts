import {left} from '../../src/tuple';

/**
 * tsfun | left
 *
 * @author Daniel de Oliveira
 */
describe('left', () => {

    it('left', () =>
        expect(

            left([4, 5])

        ).toEqual(4));


    it('undefined', () =>
        expect(

            () => left([] as any)

        ).toThrow());
});