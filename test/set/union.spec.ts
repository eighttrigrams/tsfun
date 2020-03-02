import {union} from "../../src/set";

/**
 * @author Daniel de Oliveira
 */
describe('union', () => {

    it('union ',() =>
        expect(

            union([[1, 2],[3, 4],[2, 4]]))

            .toEqual([1, 2, 3, 4]));


    it('string ',() =>
        expect(

            union(['12','34','24']))

            .toEqual('1234'));
});
