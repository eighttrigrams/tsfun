import {differentFrom} from '../../src/comparator';


/**
 * @author Daniel de Oliveira
 */
describe('differentFrom', () => {


    it('differentFrom', () =>
        expect(

            differentFrom({a: 1})({a: 1})

        ).toEqual(true));
});