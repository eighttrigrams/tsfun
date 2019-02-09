import {nth, nthOr} from "../../src/arraylist";


/**
 * @author Daniel de Oliveira
 */
describe('nth / nthOr', () => {

    // getOnOr

    it('nthOr',() =>
        expect(

            nthOr([1, 2], undefined)(0))

            .toEqual(1));


    it('nthOr - undefined',() =>
        expect(

            nthOr([1, 2], undefined)(3))

            .toEqual(undefined));


    it('nthOr - alternative',() =>
        expect(

            nthOr([1, 2], 7)(3))

            .toEqual(7));

    // getOn

    it('get',() =>
        expect(

            nth([1, 2])(0))

            .toEqual(1));


    it('getOn nothing',() =>
        expect(

            () => nth([1, 2])(3))

            .toThrow(Error('nth, got nothing')));
});
