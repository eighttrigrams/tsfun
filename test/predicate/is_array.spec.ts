import {isArray} from 'tsfun-core';

/**
 * If an entity is an Array is determined
 * by checking
 * as instanceof Array
 *
 * @author Daniel de Oliveira
 */
describe('isArray', () => {


    it('isArray',() =>
        expect(

            isArray([]))

            .toEqual(true));
});