import {doWhile} from '../../src/util';
import {greaterThan} from '../../src/comparator';


/**
 * @author Daniel de Oliveira
 */
describe('doWhile - experimental', () => {

    it('doWhile', () => {

        let x = 0;
        doWhile(greaterThan(3), (y: number) => (x++, y-1))(6);
        expect(x).toBe(3);
    });
});