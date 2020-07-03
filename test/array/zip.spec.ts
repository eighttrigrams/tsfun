import {zip} from "../../src/array";

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
});