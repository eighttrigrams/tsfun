import {path} from '../../src/struct';

/**
 * tsfun | path
 *
 * @author Daniel de Oliveira
 */
describe('path', () => {

    it('string to array', () =>
        expect(

            path('a[0].a')

        ).toEqual(['a', 0, 'a'])
    );


    it('string to array - two consecutive numbers', () =>
        expect(

            path('a[0][0].a')

        ).toEqual(['a', 0, 0, 'a'])
    );


    it('array to string', () =>
        expect(

            path(['a', 0, 'a'])

        ).toEqual('a[0].a')
    );


    it('array to string - two consecutive numbers', () =>
        expect(

            path(['a', 0, 0, 'a'])

        ).toEqual('a[0][0].a')
    );
});