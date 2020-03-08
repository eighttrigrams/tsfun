import {Associative} from '../../src/type';

describe('Associative', () => {

    it('Associative', () => {

        const l1: Associative<number> = [1,2];
        const l2: Associative<number> = {a: 3, b: 4};
        const l3: Associative = {a: 3, b: '4'}; // default is 'any'
    });
});