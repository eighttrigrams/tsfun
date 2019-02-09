/**
 * @author Daniel de Oliveira
 */
import {copy} from "../../src/arraylist";


describe('copy', () => {


    it('copy - array',() =>
        expect(

            copy([2,4]))

            .toEqual([2, 4]));


    it('copy - array, retain instance',() => {

        const instance = {a: 'hey'};
        expect(copy([instance, 4])[0])
            .toBe(instance)
    });
});
