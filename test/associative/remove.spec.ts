import {lessThan} from '../../src/comparator';
import {remove} from '../../src/associative';


describe('remove', () => {

    it('array', () =>
        expect(

            remove(lessThan(4))([2, 4])

        ).toEqual([4]));


    it('object', () =>
        expect(

            remove(lessThan(4))({a: 2, b: 4})

        ).toEqual({b: 4}));


    it('array i', () => {

        expect(

            remove((_, i: number) => i === 1)([17, 19, 22]))

            .toEqual([17, 22]);
    });


    it('object with k', () => {

        expect(

            remove((_, k: string) => k === 'd')({d: 3, e: 4}))

            .toEqual({e: 4});
    });
});
