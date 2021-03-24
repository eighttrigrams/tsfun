export {
    jsonClone,
    clone,
    dissoc,
    to,
    update,
    $getElForPathIn,
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
    Effect,
    Array2,
    Key,
    Path,
    Comparator,
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
    curry,
    otherwise,
    nop,
    val,
    throws,
    collect,
    mcompose,
    mmatch,
    apply
} from './src/composition'


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
    flatMap,
    range,
    dense,
    remove,
    separate,
    distribute,
    reduce0,
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
    prepend,
    forEach,
    reduce,
    zip,
    takeUntil,
    reverse,
    first,
    rest,
    last,
    takeNth,
    sort,
    join,
    split
} from './src/array'


export {
    // takeUntil, // TODO document in readme or remove
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
    update_a,
    filter,
    lookup,
    keys,
    values,
    keysValues,
    map,
    Filter1,
    count,
    size,
    prune,
    indices,
    copy,
    any,
    all
} from './src/associative'
