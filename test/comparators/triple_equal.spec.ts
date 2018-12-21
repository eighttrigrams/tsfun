import {tripleEqual} from '../../src/comparators';

describe('tripleEqual', () => {

    // tripleEqual unsurprisingly uses comparison via `===`.
    // and can for example be used with filter

    it('tripleEqual',() =>
        expect(

            tripleEqual('a')('a'))

            .toEqual(true));


    it('tripleEqual not equal',() =>
        expect(

            tripleEqual('a')('b'))

            .toEqual(false));
});