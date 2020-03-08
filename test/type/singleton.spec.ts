import {Singleton} from '../../src/type';

describe('Singleton', () => {

    it('Singleton', () => {

        const s1: Singleton<number> = [2];
        // wrong - const s2: Singleton<number> = [3, 4];
        // wrong - const s2: Singleton<number> = [];
    });
});