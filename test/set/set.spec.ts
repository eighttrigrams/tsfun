import {set} from "../../src/set";

/**
 * @author Daniel de Oliveira
 */
describe('set', () => {

    it('set', () =>
        expect(

            set([1, 1, 7, 8, 7, 1]))

            .toEqual([1, 7, 8]));


    it('of none', () =>
        expect(

            set([]))

            .toEqual([]));


    it('set', () =>
        expect(

            set('117871')

        ).toEqual('178'));
});
