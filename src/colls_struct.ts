import {getIth} from './arrays';
import {getElForPathIn} from './struct';

export const get = <T>(ds: Object|Array<T>, alternative?: any) => (path: string|number) => {

    const result = (typeof path === 'number')
        ? getIth(ds as Array<T>)(path)
        : getElForPathIn(ds as Object, path);

    return result !== undefined
        ? result
        : alternative;
};