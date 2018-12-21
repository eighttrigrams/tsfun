import {tripleEqual} from '../../src/comparators';

describe('tripleEqual', () => {

    // sameOn

    it('tripleEqual',() =>
        expect(

            tripleEqual('a')('a'))

            .toEqual(true));


    it('tripleEqual not equal',() =>
        expect(

            tripleEqual('a')('b'))

            .toEqual(false));
});