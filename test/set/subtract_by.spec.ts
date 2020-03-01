import {subtractBy} from "../../src/set";
import {jsonEqual} from "../../src/comparator";


/**
 * @author Daniel de Oliveira
 */
describe('subtractBy', () => {


    it('subtractBy', () =>
        expect(

            subtractBy(jsonEqual)<any>([{a: 'a'}])([{a: 'a'}, {c: 'c'}]))

            .toEqual([{c: 'c'}]));
});
