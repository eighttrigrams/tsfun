import {Pair} from '../../src/type';

describe('Pair', () => {

    it('typing', () => {

        const p1: Pair<string, number> = ['3', 3];
        // wrong - const p2: Pair<any, any> = ['3', 4, 5];
        // wrong - const p2: Pair<any, any> = ['3'];
        // wrong - const p2: Pair<any, any> = [];

        const p2: Pair = ['3', 3];
        const p3: Pair<string> = ['3', '5'];
    });
});