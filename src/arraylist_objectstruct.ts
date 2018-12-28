import {ArrayList, ObjectStruct} from './type';
import {getElForPathIn} from './objectstruct';

// ------------ @author Daniel de Oliveira -----------------


export const getOrElse = <T>(ds: ObjectStruct|ArrayList<T>, alternative: any) => (path: string|number) => {

    const result = (typeof path === 'number')
        ? getIth(ds as Array<T>)(path)
        : getElForPathIn(ds as Object, path);

    return result !== undefined
        ? result
        : alternative;
};


export const get = <T>(ds: ObjectStruct|ArrayList<T>) => (path: string|number) => {

    const result = getOrElse(ds, undefined)(path);
    if (result === undefined) throw Error('get, got nothing');
    return result;
};


// Written with Thomas Kleinke
const getIth =
    <A>(as: ArrayList<A>) =>
        (i: number): A|undefined => getIthOr(as)(i);


// Written with Thomas Kleinke
const getIthOr =
    <A>(as: ArrayList<A>, defaultValue: A|undefined = undefined) =>
        (i: number): A|undefined =>
            as.length < i ? defaultValue : as[i];