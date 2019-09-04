import {not} from '../../src/predicate';
import {tripleEqual} from '../../src/comparator';

describe('not', () => {


    it('not',() =>
        expect(

            not(tripleEqual('a'))('a'))

            .toEqual(false));
});