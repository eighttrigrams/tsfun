export {
    assoc,
    dissoc,
    update
} from './src/object'


export {
    keysAndValues,
    reduce,
    forEach
} from './src/associative'


export {
    to
} from './src/struct'


export type {
    Map,
    Pair,
    Just,
    Nothing,
    Predicate,
    Singleton,
    Maybe,
    List,
    Collection,
    Failure,
    Success,
    Either,
    Associative,
    Fallible,
    Mapping,
    Filter,
    Effect
} from './src/type'


export {
    identity
} from './src/core'

export {
    not,
    defined,
    undefinedOrEmpty,
    has,
    hasnt,
    empty,
    and,
    or,
    xor,
    isArray,
    isObject,
    isAssociative,
    isSingleton,
    isList,
    isNumber,
    isBoolean,
    isFunction,
    isNot, isDefined,
    isString,
    isUndefinedOrEmpty, isEmpty, isUndefined,
    isSuccess, isFailure, isEither, isMaybe, isPair
} from './src/predicate'


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
    includes,
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
    shorterThan,
    longerThan,
    sameLength
} from './src/comparator'


export {
    compose,
    flow,
    cond,
    conds,
    otherwise,
    nop,
    val,
    throws,
    collect,
    mcompose,
    mmatch
} from './src/composition'


export {
    toUpperCase,
    toLowerCase,
    join,
    split
} from './src/string'


export {
    left,
    right,
    value,
    getSuccess,
    tuplify,
    pairWith,
    swap,
    liftE,
    liftM,
    nothing,
    success,
    failure,
    just,
    singleton,
    pair,
    LEFT,
    RIGHT
} from './src/tuple'


export {
    map,
    flatMap,
    range,
    zipWith,
    dense,
    filter,
    remove,
    separate,
    reduce1,
    flatten,
    take,
    takeRight,
    takeRightWhile,
    takeWhile,
    dropWhile,
    dropRightWhile,
    dropRight,
    drop,
    append,
    prepend
} from './src/array'


export {
    reverse,
    first,
    rest,
    last,
    takeUntil, // TODO document in readme
    takeNth,
    zip,
    sort,
    FIRST
} from './src/list'


export {
    duplicates,
} from './src/set'


export {
    intersection,
    union,
    set,
    intersect,
    subtract,
    unite
} from './src/set'


export {
    count,
    size,
    prune,
    indices,
    copy,
    any,
    all
} from './src/collection'