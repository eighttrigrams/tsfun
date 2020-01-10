/**
 * @author Daniel de Oliveira
 */
import {subsetOfBy, on} from "../../src/comparator";


describe('subsetOfBy', () => {


    it('subsetOfBy', () =>
        expect(

            subsetOfBy(on('a'))([{a: 3}, {a: 4}])([{a: 4}])

        ).toEqual(true));
});