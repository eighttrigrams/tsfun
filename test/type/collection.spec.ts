import {Collection} from '../../src/type';

describe('Collection', () => {

    it('Collection', () => {

        const l1: Collection<number> = [1,2];
        const l3: Collection<number> = {a: 3, b: 4};
        const l2: Collection = 'abc';
        const l4: Collection = {a: 3, b: '4'}; // default is 'any'
        const l5: Collection = [1, '2']; // default is 'any'
    });
});