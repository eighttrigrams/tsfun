export {
    Predicate,
    PredicateProducer,
    Comparator,
    ComparatorProducer,
    NestedArray,
    Pair,
    Either,
    ArrayList,
    ArraySet,
    ObjectCollection,
    ObjectSet,
    ObjectStruct,
    UntypedObjectCollection,
    ObjectMap
} from './src/type';

export {
    identity
} from './src/core';

export {
    isNot,
    isDefined,
    isUndefined,
    isUndefinedOrEmpty,
    isEmpty,
    isArray,
    isObject
} from './src/predicate';


export {
    arrayEqualBy,
    samesetBy,
    equalBy,
    objectEqualBy,
    includedInBy,
    differentFromBy,
    subsetOfBy,
    supersetOfBy
} from './src/comparator';


export {
    getElForPathIn // TODO export necessary?
} from './src/struct';


export {
    intersectionBy,
    unionBy,
    intersectBy,
    subtractBy,
    uniteBy,
    uniqueBy,
} from './src/arrayset';