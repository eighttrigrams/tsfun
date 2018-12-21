import {jsonEqual} from '../../src/comparators';

describe('jsonEqual', () => {

    // sameOn

    it('jsonEqual',() =>
        expect(

            jsonEqual({a: 'b', c: 'd'})({a: 'b', c: 'd'}))

            .toEqual(true));


    it('order matters',() =>
        expect(

            jsonEqual({a: 'b', c: 'd'})({c: 'd', a: 'b'}))

            .toEqual(false));
});