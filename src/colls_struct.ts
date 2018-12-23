import {getIth} from './arrays';
import {getElForPathIn} from './struct';
import {ArrayList, Struct} from './types';

export const get = <T>(ds: Struct|ArrayList<T>, alternative?: any) => (path: string|number) => {

    const result = (typeof path === 'number')
        ? getIth(ds as Array<T>)(path)
        : getElForPathIn(ds as Object, path);

    return result !== undefined
        ? result
        : alternative;
};