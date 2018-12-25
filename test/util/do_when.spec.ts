import {doWhen} from '../../src/util';
import {greaterThan} from '../../src/comparator';


/**
 * @author Daniel de Oliveira
 */
describe('doWhen - experimental', () => {

    it('doWhen', () => {

        let x = false;
        doWhen(greaterThan(3), () => x = true)(4);
        expect(x).toBe(true);
    });
});