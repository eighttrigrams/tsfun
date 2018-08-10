export {
    isNot,
    isEven,
    isOdd,
    isDefined,
    isUndefined,
    isArray
} from './src/predicates';


export {
    arrayEqual,
    arrayEqualBy,
    arrayEquivalent,
    arrayEquivalentBy,
    objectEquivalent,
    objectEquivalentBy,
    tripleEqual,
    includedIn,
    differentFrom,
    differentFromBy,
    jsonEqual,
    onBy,
    on,
    biggerThan,
    smallerThan,
    sameOn
} from './src/comparators';


export {
    take,
    takeRightWhile,
    takeUntil,
    takeWhile,
    takeNth,
    dropWhile,
    drop,
    dropRight,
    dropRightWhile
} from './src/arrays/list_like_pick';


export {
    flow,
    flowP
} from './src/flow';


export {
    reverse,
    flatMap,
    mapTo,
    filter,
    map
} from './src/arrays/list_like';


export {
    NestedArray,
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
} from './src/arrays/set_like';


export {
    subtractMap,
    intersectMap,
    uniteMap,
    unionMap
    // intersectionMap TODO implement
} from './src/maps/set_like'


export {
    mapMap,
    filterMap,
} from './src/maps/list_like'


export {copy,
    isUndefinedOrEmpty, // TODO move to predicates
    isEmpty
} from './src/coll';
export {doWhen} from './src/core';


export {
    getElForPathIn,
    takeOrMake,
    clone,
    to,
    option
} from './src/objects/core';

// TODO add more powerful object comparison
// TODO add filter(or(on('name:'))('a', 'b'))
//       or filter(on('name')(or('a','b'))


// document this usage pattern
// return onBy(objectEquivalentBy(arrayEquivalent))('resource.relations')
// (documentA)(documentB);
