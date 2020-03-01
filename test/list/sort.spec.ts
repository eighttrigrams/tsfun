import {sort} from '../../src/list';


const aFirst = (a: string, _: string) => a === 'a' ? -1 : 1;


describe('sort', () => {

    it('sort', () =>
        expect(

            sort(aFirst)(['b', 'a'])

        ).toEqual(['a','b']));


    it('sort - array of numbers - no param', () =>
        expect(

            sort([2, 1])

        ).toEqual([1, 2]));


    it('string', () =>
        expect(

            sort(aFirst)('babbba')

        ).toEqual('aabbbb'));


    it('string - no param', () =>
        expect(

            sort('babbba')

        ).toEqual('aabbbb'));
});