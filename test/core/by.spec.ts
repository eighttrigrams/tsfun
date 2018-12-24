import {by} from '../../src/core';
import {intersectBy} from '../../src/arrayset';
import {jsonEqual, on} from '../../src/comparator';

/**
 * @author Daniel de Oliveira
 */
describe('by', () => {

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
