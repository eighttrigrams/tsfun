import {filterObject} from '../../../src/collections/objects_list_like';


describe('filterObject', () => {


    it('filterObject', () => {

        expect(

            filterObject((x: number) => x > 1)({a: 1, b: 2})

        ).toEqual({b: 2})
    });
});
