import {mapObject} from '../../src/objects_coll';


describe('mapObject', () => {

    it('mapObject', () => {

        expect(

            mapObject<number, number>(x => x * 2)({a: 1, b: 2})

        ).toEqual({a: 2, b: 4})
    });
});
