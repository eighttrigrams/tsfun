import {filterObject} from '../../src/collections/objects_coll';


describe('filterObject', () => {


    it('filterObject', () => {

        expect(

            filterObject((x: number) => x > 1)({a: 1, b: 2})

        ).toEqual({b: 2})
    });
});
