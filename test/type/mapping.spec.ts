import {Mapping} from '../../src/type';

describe('Mapping', () => {

    it('typing', () => {

        const m1: Mapping = (_: string) => true;
        const m2: Mapping<string> = (_: string) => 'abc';
        const m3: Mapping<string, boolean> = (_: string) => true;
    });
});