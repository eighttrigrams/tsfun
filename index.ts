export {
    to,
    jsonClone,
    lookupOn,
    getOn,
    clone,
    assocOn,
    dissocOn,
    updateOn,
    getElForPathIn,
    convertPath
} from './src/struct';


export {
    Map,
    Pair,
    Predicate,
    Singleton,
    Maybe,
    List,
    Collection,
    Either,
    Associative
} from './src/type';


export {
    identity
} from './src/core';

export {
    not,
    defined,
    undefinedOrEmpty,
    has,
    hasNot,
    empty,
    and,
    or,
    xor,
    isArray,
    isObject,
    isAssociative,
    isList,
    isNumber,
    isBoolean,
    isFunction,
    isNot, isDefined,
    isString,
    isUndefinedOrEmpty, isEmpty, isUndefined,
    isSuccess, isFailure, isEither, isMaybe, isPair
} from './src/predicate';


export {
    is,
    isnt,
    tripleEqual,
    jsonEqual,
    arrayEqual,
    sameset,
    equal,
    equalTo,
    objectEqual,
    includedIn,
    differentFrom,
    subsetOf,
    by,
    on,
    greaterThan,
    greaterOrEqualThan,
    startsWith,
    endsWith,
    lessThan,
    lessOrEqualThan,
} from './src/comparator';


export {
    compose,
    flow,
    cond,
    nop,
    val,
    throws
} from './src/composition';


export {
    toUpperCase,
    toLowerCase,
    join,
    split
} from './src/string';


export {
    left,
    right,
    tuplify,
    pairWith,
    swap
} from './src/tuple';


export {
    flatMap,
    flatten,
    range,
    zipWith,
    dense,
    reduce1
} from './src/array'

export {
    reverse,
    append,
    prepend,
    first,
    rest,
    last,
    take,
    takeRight,
    takeRightWhile,
    takeUntil,
    takeWhile,
    takeNth,
    dropWhile,
    drop,
    dropRight,
    dropRightWhile,
    zip,
    sort
} from './src/list';


export {
    duplicates,
} from './src/set';


export {
    intersection,
    union,
    set,
    intersect,
    subtract,
    unite
} from './src/set';


export {
    keysAndValues,
    keys,
    values,
    lookup,
    assoc,
    update,
    dissoc,
    forEach,
    get,
    reduce,
    map
} from './src/associative';


export {
    count,
    size,
    prune,
    indices,
    filter,
    remove,
    copy,
    separate,
} from './src/collection'