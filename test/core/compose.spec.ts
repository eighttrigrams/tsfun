import {compose, flow} from '../../src/composition';
import {uniteObject} from '../../src/objectset';
import {drop, dropRight, take} from '../../src/arraylist';


describe('compose', () => {

    // compose

    it('compose', () =>
        expect(

            compose(uniteObject({c: 3}))({a: 1, b: 2}))

            .toEqual({a: 1, b: 2, c: 3}));


    it('compose', () =>
        expect(

            compose(take(1))([5, 6]))

            .toEqual([5]));


    it('compose nest', () =>
        expect(

            flow(
                [5, 6, 8, 9],
                compose(
                    drop(1),
                    dropRight(1),
                    compose(
                        dropRight(1)))))

            .toEqual([6]));
});


