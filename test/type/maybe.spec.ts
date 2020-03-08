import {Maybe} from '../../src/type';

describe('Maybe', () => {

    it('Maybe', () => {

        const m1: Maybe<number> = [];
        const m2: Maybe<number> = [3];
        // wrong - const m3: Maybe<number> = [3, 4];
        // wrong - const m3: Maybe<number> = ['3'];
    });
});