import {getIth} from './arrays';
import {getElForPathIn} from './struct';
import {ObjectCollection} from './types';

export const get = <T>(ds: ObjectCollection<T>|Array<T>, alternative?: any) => (path: string|number) => {

    const result = (typeof path === 'number')
        ? getIth(ds as Array<T>)(path)
        : getElForPathIn(ds as Object, path);

    return result !== undefined
        ? result
        : alternative;
};