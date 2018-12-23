/**
 * @author Daniel de Oliveira
 */
import {apply} from '../../src/arraylist';


describe('apply', () => {

    it('apply',() =>
        expect(

            apply<number>((_, __) => _ + __)(2,4, 5))

            .toEqual(11));


    it('apply, rest params',() =>
        expect(

            apply<number>((_, __) => _ + __)(...[2,4, 5]))

            .toEqual(11));
});