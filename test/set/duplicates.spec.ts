import {duplicates} from '../../src/set';


/**
 * @author Daniel de Oliveira
 */
describe('duplicates', () => {

    it('list of number ',() =>
        expect(

            duplicates([3, 3, 1, 4, 3, 1])

        ).toEqual([3, 1]));


    it('list of string ',() =>
        expect(

            duplicates(['3', '3', '1', '4', '3', '1'])

        ).toEqual(['3', '1']));


    it('string', () =>
        expect(

            duplicates('331431')

        ).toEqual('31'));
});
