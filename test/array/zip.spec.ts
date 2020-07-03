import {zip} from "../../src/array";
import {collect, flow} from '../../src/composition';

/**
 * tsfun | zip
 */
describe('zip', () => {

    it('base', () =>
        expect(

            zip([1,2,4])([3,4,5])

        ).toEqual([[1,3],[2,4],[4,5]])
    );


    it('shorter', () =>
        expect(

            zip([1,2])([3,4,5])

        ).toEqual([[1,3],[2,4]])
    );


    it('one argument list', () =>
        expect(

            zip([1,2], [3,4])

        ).toEqual([[1,3],[2,4]])
    );


    it('variable argument lists', () =>
        expect(

            zip(...[[1,2], [3,4]])

        ).toEqual([[1,3],[2,4]])
    );


    // TODO move to composition
    function spread<A,B>(f: (_: Array<Array<A>>) => B) {

        return (as: Array<Array<A>>): B => {

            return (f as any)(...as)
        }
    }
    it('spread - typing', () => {

        const result: Array<Array<number>> = flow([[1,2],[3,4]], spread(zip));
    });

    it('composition', () =>
        expect(

            flow([[1,2],[3,4]], spread(zip))

        ).toEqual([[1,3],[2,4]])
    );
});