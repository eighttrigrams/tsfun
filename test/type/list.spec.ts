import {List} from '../../src/type';

describe('List', () => {

    it('List', () => {

        const l1: List<number> = [1,2];
        const l2: List = 'abc';
        const l3: List = ['1', 2]; // default is 'any'
    });
});