import {reverse} from '../../src/list';


describe('reverse', () => {

    it('basic', () =>
        expect(

            reverse([2, 7, 3])

        ).toEqual([3, 7, 2])
    );


    it('string', () =>
        expect(

            reverse('aloha')

        ).toEqual('ahola')
    );
});