import {nth} from "../../src/arraylist";


/**
 * @author Daniel de Oliveira
 */
describe('nth / nthOr', () => {


    it('nth',() =>
        expect(

            nth(0)([1, 2]))

            .toEqual(1));


    it('nth nothing',() =>
        expect(

            () => nth(3)([1, 2]))

            .toThrow(Error('nth, got nothing')));
});
