import {doWhen} from '../../src/util';
import {biggerThan} from '../../src/comparator';


/**
 * @author Daniel de Oliveira
 */
describe('doWhen - experimental', () => {

    it('doWhen', () => {

        let x = false;
        doWhen(biggerThan(3), () => x = true)(4);
        expect(x).toBe(true);
    });
});