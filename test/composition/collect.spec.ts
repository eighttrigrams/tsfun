import {collect} from '../../src/composition';


describe('collect', () => {

    it('demo', () =>
        expect(

            collect(3, 5, 7)

        ).toEqual([3, 5, 7]));
});