import {mapObj} from '../../src/objectcoll';


describe('mapObj', () => {

    it('mapObj', () => {

        expect(

            mapObj<number, number>(x => x * 2)({a: 1, b: 2})

        ).toEqual({a: 2, b: 4})
    });
});
