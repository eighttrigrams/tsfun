import {jsonEqual} from '../../src/comparators';

describe('jsonEqual', () => {

    // jsonEqual compares to objects by comparing their string representations
    // via `JSON.parse(JSON.stringify(item))`
    // which makes the order of keys matter

    it('jsonEqual',() =>
        expect(

            jsonEqual({a: 'b', c: 'd'})({a: 'b', c: 'd'}))

            .toEqual(true));


    it('order matters',() =>
        expect(

            jsonEqual({a: 'b', c: 'd'})({c: 'd', a: 'b'}))

            .toEqual(false));
});