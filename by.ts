export {
    Predicate,
    PredicateProducer,
    Comparator,
    ComparatorProducer,
    Pair,
    Either,
} from './src/type';

export {
    identity
} from './src/core';

export {
    arrayEqualBy,
    samesetBy,
    equalBy,
    objectEqualBy,
    includedInBy,
    includesBy,
    differentFromBy,
    subsetOfBy,
    supersetOfBy
} from './src/comparator';

export {
    intersectionBy,
    unionBy,
    intersectBy,
    subtractBy,
    uniteBy,
    setBy,
} from './src/set';