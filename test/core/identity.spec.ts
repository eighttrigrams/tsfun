import {by, identical, identity} from '../../src/core';
import {intersectBy} from '../../src/arrayset';
import {jsonEqual, on} from '../../src/comparator';

/**
 * @author Daniel de Oliveira
 */
describe('identity / identical / by', () => {

    // identity

    it('identity',() =>
        expect(

            identity(3))

            .toEqual(3));

    // identical

    it('identical',() =>
        expect(

            identical(3))

            .toEqual(3));

    // by

    it('by',() =>
        expect(

            by(() => 3)())

            .toEqual(3));


    it('intended use case',() =>
        expect(

            intersectBy(on('a.b', by(jsonEqual)))
                ([{a: {b: {c: 'e'}}}, {a: {b: 'c'}}])
                ([{a: {b: {c: 'e'}}}]))

            .toEqual([{a: {b: {c: 'e'}}} as any]));
});
