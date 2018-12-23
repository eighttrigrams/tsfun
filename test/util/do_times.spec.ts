import {doTimes} from '../../src/util';


/**
 * @author Daniel de Oliveira
 */
describe('doTimes', () => {

    it('doTimes', () => {

        let x = 0;
        doTimes(3, () => x++);
        expect(x).toBe(3);
    });


    it('0 times', () => {

        let x = 0;
        doTimes(0, () => x++);
        expect(x).toBe(0);
    });
});