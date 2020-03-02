import {setBy} from "../../src/set";
import {jsonEqual, on} from "../../src/comparator";


/**
 * @author Daniel de Oliveira
 */
describe('setBy', () => {

    it('setBy with on', () =>
        expect(
            setBy(on('a'))([{a: 1}, {a: 2}, {a: 1}])
        ).toEqual([{a: 1}, {a: 2}])
    );


    it('setBy', () =>
        expect(

            setBy(jsonEqual)([{a: 'c'}, {a: 'c'}]))

            .toEqual([{a: 'c'}]));
});
