import {unionObject} from '../../src/objectset';


describe('unionObj', () => {


    it('unionObject', () =>
        expect(

            unionObject([{3: 4}, {4: 4}, {1: 2}]))

            .toEqual({1: 2, 3: 4, 4: 4}));


    it('one', () =>
        expect(

            unionObject([{3: 4}]))

            .toEqual({3: 4}));


    it('empty', () =>
        expect(

            unionObject([]))

            .toEqual({}));
});
