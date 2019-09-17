import {compose, flow} from '../../src/composition';
import {drop, dropRight, take} from '../../src/arraylist';


/**
 * @author Daniel de Oliveira
 */
describe('compose', () => {

    // TODO
    // it('compose', () =>
    //     expect(
    //
    //         compose(uniteObj({c: 3}))({a: 1, b: 2}))
    //
    //         .toEqual({a: 1, b: 2, c: 3}));


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


    // intended use case
    //
    // const evenAndSmallerThan6 = flowP(
    //     filter(smallerThan(6)),
    //     filter(even())
    // flow(
    //     [1, 2, 3, 4, 6, 7, 8],
    //     evenAndSmallerThan6,
    //     take(1))
    //     .includes(2)
    //
    // -> true
});


