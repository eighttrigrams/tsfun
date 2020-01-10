import {uniteBy} from "../../src/arrayset";
import {jsonEqual} from "../../src/comparator";


/**
 * @author Daniel de Oliveira
 */
describe('unityBy', () => {


    it('uniteBy', () =>
        expect(

            uniteBy(jsonEqual)<any>([{a: 'a'}, {c: 'c'}])([{c: 'c'}, {d: 'd'}]))

            .toEqual([{a: 'a'}, {c: 'c'}, {d: 'd'}]));
});
