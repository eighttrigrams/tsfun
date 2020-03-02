import {filter} from '../../src/associative';
import {greaterThan, lessThan} from '../../src/comparator';


describe('filter', () => {

    it('array', () =>
        expect(

            filter(lessThan(4))([2, 4, 3])

        ).toEqual([2, 3]));


    it('object', () =>
        expect(

            filter(lessThan(4))({a: 2, b: 4, c: 3}))

        .toEqual({a: 2, c: 3}));


    it('array i', () => {

        expect(

            filter((_, i: number) => i !== 1)([17, 19, 22]))

            .toEqual([17, 22]);
    });


    it('object with k', () => {

        expect(

            filter((_, k: string) => k !== 'd')({d: 3, e: 4}))

            .toEqual({e: 4});
    });


    it('string', () => {

        expect(

            filter(greaterThan('d'))('ede'))

            .toEqual('ee');
    });
});
