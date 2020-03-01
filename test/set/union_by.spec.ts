import {unionBy} from "../../src/set";
import {jsonEqual} from "../../src/comparator";


/**
 * @author Daniel de Oliveira
 */
describe('unionBy', () => {


    it('unionBy', () =>
        expect(

            unionBy(jsonEqual)<any>([[{a: 'a'}, {c: 'c'}], [{c: 'c'}, {d: 'd'}]]))

            .toEqual([{a: 'a'}, {c: 'c'}, {d: 'd'}]));
});
