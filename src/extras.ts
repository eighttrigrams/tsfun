import {subtract} from './sets';


/**
 * @author Daniel de Oliveira
 */


export const removeFrom = <A>(as: Array<A>) => (a: A): Array<A> =>
    subtract([a])(as);


export const addUniqueTo = <A>(as: Array<A>) => (a: A): Array<A> =>
    as.includes(a) ? as : as.concat([a]);