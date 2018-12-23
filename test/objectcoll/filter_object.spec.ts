import {filterObject} from '../../src/objectcoll';


describe('filterObject', () => {


    it('filterObject', () => {

        expect(

            filterObject((x: number) => x > 1)({a: 1, b: 2})

        ).toEqual({b: 2})
    });
});
