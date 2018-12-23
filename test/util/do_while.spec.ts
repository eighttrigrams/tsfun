import {doWhen, doWhile} from '../../src/util';
import {biggerThan} from '../../src/comparator';


/**
 * @author Daniel de Oliveira
 */
describe('doWhile', () => {

    it('doWhile', () => {

        let x = 0;
        doWhile(biggerThan(3), (y: number) => (x++, y-1))(6);
        expect(x).toBe(3);
    });
});