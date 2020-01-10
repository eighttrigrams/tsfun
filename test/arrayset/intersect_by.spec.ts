/**
 * intersect and intersection are fast if used without specifying a comparator
 *
 * @author Daniel de Oliveira
 */
import {jsonEqual} from "../../src/comparator";
import {intersectBy} from "../../src/arrayset";


describe('intersectBy', () => {


    it('intersectBy', () =>
        expect(

            intersectBy(jsonEqual)<any>([{a: 'a'}, {c: 'c'}])([{c: 'c'}, {d: 'd'}]))

            .toEqual([{c: 'c'}]));
});
