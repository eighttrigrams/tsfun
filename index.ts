export {
    NestedArray,
    Pair
} from './src/types';

export {
    isNot,
    not,
    isDefined,
    defined,
    isUndefined,
    has,
    hasNot,
    isUndefinedOrEmpty,
    undefinedOrEmpty,
    isEmpty,
    empty,
    isTrue,
    isFalse,
    isArray,
    isObject
} from './src/predicates';


export {
    arrayEqual,
    arrayEqualBy,
    arrayEquivalent,
    arrayEquivalentBy,
    equal,
    equalBy,
    equalTo,
    equivalent,
    objectEqual,
    objectEqualBy,
    tripleEqual,
    includedIn,
    includedInBy,
    differentFrom,
    differentFromBy,
    containedIn,
    containedInBy,
    jsonEqual,
    on,
    without,
    biggerThan,
    smallerThan,
    sameOn
} from './src/comparators';

export {
    compose,
    flow,
    composition
} from './src/composition';


export {
    reverse,
    flatMap,
    filter,
    map,
    append,
    prepend,
    separate,
    take,
    takeRightWhile,
    takeUntil,
    takeWhile,
    takeNth,
    dropWhile,
    drop,
    dropRight,
    dropRightWhile
} from './src/collections/arrays_list_like';


export {
    getIth,
    getIthOr
} from './src/arrays';


export {
    intersection,
    intersectionBy,
    union,
    unionBy,
    intersect,
    intersectBy,
    subtract,
    subtractBy,
    unite,
    uniteBy,
    unique,
    uniqueBy,
    duplicates
} from './src/collections/arrays_set_like';


export {
    subtractObject,
    intersectObject,
    uniteObject,
    unionObject
} from './src/collections/objects_set_like'


export {
    mapObject,
    filterObject,
    intoObject
} from './src/collections/objects_coll'


export {copy} from './src/collections/arraylist_objectcoll';

export {by} from './src/core';

export {get} from './src/colls_struct';

export {doWhen, addTo, mapTo} from './src/utils';

export {
    takeOrMake,
    option,
    to,
    jsonClone
} from './src/struct';


// TODO make
// .filter(on('pathType')(or(isNot(defined), 'sameRank'))