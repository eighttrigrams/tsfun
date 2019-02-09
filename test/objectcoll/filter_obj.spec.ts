import {filterObj} from '../../src/objectcoll';


describe('filterObj', () => {


    it('filterObj', () => {

        expect(

            filterObj((x: number) => x > 1)({a: 1, b: 2})

        ).toEqual({b: 2})
    });
});
