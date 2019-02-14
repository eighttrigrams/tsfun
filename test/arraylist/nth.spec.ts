import {nth, nthOr} from "../../src/arraylist";


/**
 * @author Daniel de Oliveira
 */
describe('nth / nthOr', () => {

    // getOnOr

    it('nthOr',() =>
        expect(

            nthOr(0, undefined as any)([1, 2]))

            .toEqual(1));


    it('nthOr - undefined',() =>
        expect(

            nthOr(3, undefined as any)([1, 2]))

            .toEqual(undefined));


    it('nthOr - alternative',() =>
        expect(

            nthOr(7, 7)([1, 2]))

            .toEqual(7));

    // getOn

    it('get',() =>
        expect(

            nth(0)([1, 2]))

            .toEqual(1));


    it('getOn nothing',() =>
        expect(

            () => nth(3)([1, 2]))

            .toThrow(Error('nth, got nothing')));
});
