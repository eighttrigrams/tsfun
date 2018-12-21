import {tripleEqual} from '../../src/comparators';
import {isNot} from '../../src/predicates';

describe('isNot / not', () => {

    // isNot

    it('isNot',() =>
        expect(

            isNot(tripleEqual('a'))('a'))

            .toEqual(false));
});