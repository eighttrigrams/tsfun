import {tripleEqual} from '../../src/comparators';
import {isArray} from '../../src/predicates';

describe('isArray / isObject / isString / isBoolean', () => {

    // isArray

    it('isArray',() =>
        expect(

            isArray([]))

            .toEqual(true));



    // TODO implement isBoolean
});