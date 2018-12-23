import {jsonEqual, without} from '../../src/comparator';
import {by} from '../../src/core';
import {isUndefined} from '../../src/predicate';


/**
 * @author Daniel de Oliveira
 */
describe('without', () => {


    // without TODO remove to hasNot, according to how has is used currently. however we have to review has semantics anyway

    it('without',() =>
        expect(

            [{a: 3, b: 4}, {a: 3, b: 5}, {a: 2, b: 1}]
                .filter(without('b')({a: 3})))

            .toEqual([{a: 3, b: 4}, {a: 3, b: 5}]));


    it('without, multiple paths',() =>
        expect(

            [{a: 3, b: 4, c: 5}, {a: 3, b: 5}, {a: 2, b: 1}]
                .filter(without(['b', 'c'])({a: 3})))

            .toEqual([{a: 3, b: 4, c: 5}, {a: 3, b: 5}]));


    it('without with comparator',() =>
        expect(

            [{a: 3, b: 4}, {a: 3, b: 5}, {a: 2, b: 1}]
                .filter(without('b', by(jsonEqual))({a: 3})))

            .toEqual([{a: 3, b: 4}, {a: 3, b: 5}]));


    it('without with isUndefined',() =>
        expect(

            [{b: 4}, {a: 3, b: 5}, {a: 2, b: 1}]
                .filter(without('b', isUndefined)))

            .toEqual([{b: 4}]));
});