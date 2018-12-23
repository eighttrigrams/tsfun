import {intoArray, intoArrayWith} from '../../src/arraylist';


/**
 * @author Daniel de Oliveira
 */
describe('intoArray / intoArrayWith', () => {

    it('intoArray',() =>
        expect(

            intoArray([3, 7, 9], 10))

            .toEqual([3, 7, 9, 10]));


    it('intoArrayWith',() =>
        expect(

            intoArrayWith(_ => [_, _, _])([3, 7, 9], 10))

            .toEqual([3, 7, 9, 10, 10, 10]));
});
