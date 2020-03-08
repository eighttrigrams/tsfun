import {Either} from '../../src/type';

describe('Either', () => {

    it('Either', () => {

        const e1: Either<string, number> = ['3', undefined];
        const e2: Either<string, number> = [undefined, 3];
        // wrong - const e3: Either<string, number> = ['3', 4];
        // wrong - const e3: Either<string, number> = ['3'];
    });
});