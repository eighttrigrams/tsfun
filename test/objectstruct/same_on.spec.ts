/**
 * @author Daniel de Oliveira
 */
import {sameOn} from '../../src/objectstruct';
import {is, on} from '../../src/comparator';

describe('sameOn - experimental', () => {

    it('sameOn - same path',() =>
        expect(

            sameOn('a.b', {a: {b: 5}}, {a: {b: 5}}))

            .toEqual(true));


    it('sameOn - same path 1',() =>
        expect(

            on('a.b')({a: {b: 5}})({a: {b: 5}}))

            .toEqual(true));


    it('sameOn - same path 2',() =>
        expect(

            on('a.b', is(5))({a: {b: 5}}))

            .toEqual(true));


    it('sameOn - arrays not allowed',() =>
        expect(

            sameOn('a.b', [5], [5]))

            .toEqual(true));
});
