import {copyObj} from "../../src/objectcoll";


/**
 * @author Daniel de Oliveira
 */
describe('copyObj', () => {

    it('copy - object, keys mixed numbers and strings',() =>
        expect(

            copyObj({a: 1, 2: 2}))

            .toEqual({a: 1, 2: 2}));


    it('copy - object, retain instance',() => {

        const instance = {a:  'hey'};
        expect(
            copyObj({a: 1, 2: instance})[2])
            .toBe(instance)
    });


    it('copy - retain existent keys with undefined properties',() =>

        expect(

            copyObj({a: 1, 2: undefined}))

            .toEqual({a: 1, 2: undefined}));
});
