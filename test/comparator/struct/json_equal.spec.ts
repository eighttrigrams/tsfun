import {jsonEqual} from '../../../src/comparator';


/**
 * jsonEqual compares to objects by comparing their string representations
 * via `JSON.parse(JSON.stringify(item))`
 * which makes the order of keys matter
 *
 * @author Daniel de Oliveira
 */
describe('jsonEqual', () => {


    it('jsonEqual',() =>
        expect(

            jsonEqual({a: 'b', c: 'd'})({a: 'b', c: 'd'}))

            .toEqual(true));


    it('order matters',() =>
        expect(

            jsonEqual({a: 'b', c: 'd'})({c: 'd', a: 'b'}))

            .toEqual(false));
});