import {mapTo} from '../../src/util';


/**
 * @author Daniel de Oliveira
 */
describe('mapTo', () => {

    it('mapTo', () =>

        expect(
            mapTo('a.c', [{a: {b: {c: 'd'}}}, {a: {c: {d: 'e'}}}]))

            .toEqual([{d: 'e'}]));
});