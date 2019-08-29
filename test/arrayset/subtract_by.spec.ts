import {jsonEqual} from '../../src/comparator';
import {subtractBy} from '../../src/arrayset';


/**
 * @author Daniel de Oliveira
 */
describe('subtractBy', () => {


    it('subtractBy', () =>
        expect(

            subtractBy(jsonEqual)<any>([{a: 'a'}])([{a: 'a'}, {c: 'c'}]))

            .toEqual([{c: 'c'}]));
});
