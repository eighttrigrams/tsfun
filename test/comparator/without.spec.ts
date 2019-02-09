import {by, jsonEqual, without} from '../../src/comparator';
import {isUndefined} from '../../src/predicate';


/**
 * Without lets one compare ObjectStruct items of a list to
 * to a given ObjectStruct, ignoring the specified path(s)
 *
 * @author Daniel de Oliveira
 */
describe('without (by)', () => {


    /**
     * The same-named keys, without b, getOn
     * compared to each other, using tripleEqual
     */
    it('ignore one path',() =>
        expect(

            [{a: 3, b: 4}, {a: 3, b: 5}, {a: 2, b: 1}]
                .filter(without('b')({a: 3})))

            .toEqual([{a: 3, b: 4}, {a: 3, b: 5}]));


    /**
     * The same-named keys, without b and c, getOn
     * compared to each other, using tripleEqual
     */
    it('ignore multiple paths',() =>
        expect(

            [{a: 3, b: 4, c: 5}, {a: 3, b: 5}, {a: 2, b: 1}]
                .filter(without(['b', 'c'])({a: 3})))

            .toEqual([{a: 3, b: 4, c: 5}, {a: 3, b: 5}]));


    /**
     * Other comparators can be used too of course
     */
    it('another comparator',() =>
        expect(

            [{a: 3, b: 4}, {a: 3, b: 5}, {a: 2, b: 1}]
                .filter(without('b', jsonEqual)({a: 3})))

            .toEqual([{a: 3, b: 4}, {a: 3, b: 5}]));


    /**
     * Use by to make it more readable
     */
    it('another comparator using by',() =>
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