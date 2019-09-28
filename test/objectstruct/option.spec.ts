import {is, jsonEqual, tripleEqual} from '../../src/comparator';
import {isEmpty} from '../../src/predicate';
import {flow} from '../../src/composition';
import {option, to} from '../../src/objectstruct';
import {on} from 'tsfun-core';


/**
 * @author Daniel de Oliveira
 */
describe('option - experimental', () => {


    // option

    it('option', () =>
        expect(

            flow<any>({a:{b:{c: 4}}},
                to('a.b'),
                option(on('c', is(4))),
                jsonEqual({c: 4})))

            .toEqual(true));


    it('to after failing option', () =>
        expect(

            flow<any>({a:{b:{c: 4}}},
                option(on('a.b.c', is(5))),
                to('c'),
                tripleEqual(4)))

            .toEqual(false));


    it('option isEmpty', () =>
        expect(

            flow<any>({a:{b:{c: 4}}},
                option(on('c', is(5))),
                isEmpty))

            .toEqual(true));
});