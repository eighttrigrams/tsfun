import {lZipWith, materialize} from '../../src/lazy';


/**
 * @author Daniel de Oliveira
 */
describe('lZipWith', () => {


    it('lZipWith', () => expect(

        materialize(
            lZipWith(
                (x: number, y: number) => x + y,
                [5, 5, 6])(
                [3, 4, 5]))

    ).toEqual([8, 9, 11]));
});