import {multidentity} from '../../src/composition';


describe('multidentity', () => {

    it('demo', () =>
        expect(

            multidentity(3, 5, 7)

        ).toEqual([3, 5, 7]));
});