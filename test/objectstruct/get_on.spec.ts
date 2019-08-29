import {getOn} from "../../src/objectstruct";

/**
 * @author Daniel de Oliveira
 */
describe('getOn', () => {


    it('getOn nothing object',() =>
        expect(

            () => getOn({a: {b: 4}})('c.d'))

            .toThrow(Error('getOn, got nothing')));
});
