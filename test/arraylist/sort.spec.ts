import {sort} from '../../src/arraylist';


const aFirst = (a: string, _: string) => a === 'a' ? -1 : 1;


describe('sort', () => {

    it('sort', () =>
        expect(

            sort(aFirst)(['b', 'a'])

        ).toEqual(['a','b']));



    it('string', () =>
        expect(

            sort(aFirst)('babbba')

        ).toEqual('aabbbb'));
});