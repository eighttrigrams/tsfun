import {dense} from '../../src/list';

describe('dense', () => {

    it('dense', () =>

        expect(

            dense(3)

        ).toEqual([undefined, undefined, undefined])
    );
});