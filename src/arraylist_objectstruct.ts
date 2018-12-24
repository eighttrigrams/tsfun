import {ArrayList, ObjectStruct} from './type';
import {getIth} from './arraylist';
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