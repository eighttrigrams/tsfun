import {mapObject} from '../../../src/collections/objects_list_like';


describe('mapObject', () => {

    it('mapObject', () => {

        expect(

            mapObject<number, number>(x => x * 2)({a: 1, b: 2})

        ).toEqual({a: 2, b: 4})
    });
});
