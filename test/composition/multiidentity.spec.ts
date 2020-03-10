import {multiidentity} from '../../src/composition';


describe('multiidentity', () => {

    it('demo', () =>
        expect(

            multiidentity(3, 5, 7)

        ).toEqual([3, 5, 7]));
});